import prisma from '@/prisma';
import { findUsers } from '@/services/auth/login/findFirstUser';
import { checkExistingUsers } from '@/services/auth/register/checkUsers';
import { validateEmail } from '@/utils/emailValidator';
import { hashPassword } from '@/utils/hashPassword';
import { NextFunction, Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { compareSync } from 'bcrypt';
import { updateLoginAttempt } from '@/services/auth/login/updateLoginAttempt';
import { activateAccount } from '@/services/auth/login/activateAccount';
import { findUniqueUsers } from '@/services/auth/forgotPassword/findUniqueUser';
import { saveResetToken } from '@/services/auth/forgotPassword/saveResetToken';
import { sendEmailForgotPass } from '@/utils/emailSendForgotPassword';

import { checkReferralCode } from '@/services/auth/referralCode/checkReferralCode';
import { addMonth } from '@/services/auth/register/addMonth';

export class AuthController {
  // Task 1: Doing Register
  async registerUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, role, referral_code, referral_code_other } = req.body;
      console.log('referral code', referral_code_other);

      if (!validateEmail(email))
        return res.status(400).json('Email not valid!');
      const existingUser = await checkExistingUsers(email);
      if (existingUser)
        return res.status(409).json('Email Already Registered.');
      const hashedPassword = await hashPassword(password);

      await prisma.$transaction(async (tx) => {
        console.log('referral code other', referral_code_other);
        const newUsers = await tx.users.create({
          data: {
            name,
            email,
            password: hashedPassword,
            role,
            referral_code
          }
        })

        const findReferralCode = await tx.users.findUnique({
          where: {
            referral_code: referral_code_other
          }
        })


        if (newUsers.role === 'eo') {
          return res.status(201).send(newUsers)
        }

        if (referral_code_other) {
          console.log('data referral code terakhir', findReferralCode);
          if (!findReferralCode || findReferralCode.role !== 'customers') {
            throw res.status(401).send('Invalid Referral Code')
          }
          await tx.voucher.create({
            data: {
              name_voucher: 'discount register',
              start_date: new Date(),
              end_date: addMonth(new Date(), 3),
              event_id: null,
              user_id: newUsers.id
            }
          })
          const findUserId = await tx.users.findFirst({
            where: {
              referral_code: referral_code_other
            }
          })
          if (!findUserId) {
            throw res.status(404).send('No Referral Code Exists')
          }
          const findPointUser = await tx.poin.findFirst({
            where: {
              usersId: findUserId.id
            }
          })

          if (findPointUser) {
            const findByReferralCode = await tx.poin.findUnique({
              where: {
                referral_code: referral_code_other
              }
            })
            await tx.poin.update({
              where: {
                id: findByReferralCode?.id
              },
              data: {
                amount: findPointUser.amount + 10000,
                usersId: findPointUser.usersId
              }
            })
          } else {
            await tx.poin.create({
              data: {
                referral_code: referral_code_other,
                createdAt: new Date(),
                expiredAt: addMonth(new Date(), 3),
                amount: 10000,
                usersId: findUserId.id
              }
            })
          }
        }

        return res.status(201).send(newUsers)
      })
    } catch (error) {
      next(error);
    } finally {
      async () => {
        await prisma.$disconnect()
      }
    }
  }

  // Task 2: Doing Login
  async loginUsers(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.status(400).send('Account not found!');
      }
      const findUser = await findUsers(email, email);
      if (!findUser) return res.status(404).send('Account not exists');

      const differentDay = Date.now() > new Date(findUser?.updatedAt).getTime();
      if (differentDay) {
        await updateLoginAttempt(findUser.id, 0);
      }

      if (!findUser.isActive) {
        // Memberikan penundaan 1 menit jika akun dinonaktifkan
        setTimeout(async () => {
          await activateAccount(findUser.id); // Mengaktifkan kembali akun setelah 1 menit
        }, 45000); // 1 menit dalam milidetik

        return res.status(429).send('Your account is Suspended!');
      }

      const comparePassword = compareSync(password, findUser?.password);
      if (!comparePassword) {
        if (findUser.tryLogin < 3) {
          let limitcount = findUser.tryLogin + 1;
          await prisma.users.update({
            where: {
              id: findUser?.id,
            },
            data: { tryLogin: findUser?.tryLogin + 1 },
          });
          return res
            .status(400)
            .send(`Password Incorect, ${4 - limitcount} chance remaining`);
        } else {
          await prisma.users.update({
            where: { id: findUser.id },
            data: { isActive: false },
          });
          setTimeout(async () => {
            await activateAccount(findUser.id); // Mengaktifkan kembali akun setelah 1 menit
          }, 60000);
          return res.status(400).send(`Your Account is Suspend!`);
        }
      }
      //Reset limit count
      if (findUser.tryLogin > 0 || findUser.tryLogin < 3) {
        await prisma.users.update({
          where: { id: findUser.id },
          data: {
            tryLogin: 0,
          },
        });
      }
      const token = sign(
        { id: findUser.id, role: findUser.role },
        process.env.TOKEN_KEY || 'secret',
      );
      return res.status(200).send({
        username: findUser.name,
        email: findUser.email,
        role: findUser.role,
        token: token,
      });
    } catch (error) {
      next(error);
    }
  }

  // Task 3: Doing Keep Login
  async keepLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.decript.id;

      const user = await prisma.users.findUnique({
        where: { id: userId },
      });
      if (!user) {
        return res.status(404).send('User not found');
      }

      if (user.role !== 'eo' && user.role !== 'customers') {
        return res.status(403).send('Forbidden');
      }
      const token = sign(
        { id: userId, role: user.role },
        process.env.TOKEN_KEY || 'secret',
        // { expiresIn: '1h' },
      );
      return res.status(200).send({
        username: user.name,
        email: user.email,
        role: user.role,
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  // Task 4: Doing Forgot Password
  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const users = await findUniqueUsers(email);
      if (!users) return res.status(404).send('Account not found!');
      const token = sign(
        { userId: users.id },
        process.env.TOKEN_KEY || 'secretpassforgot',
      );
      await saveResetToken(users.id, token);

      const URL = `http://localhost:3000/reset-password/${token}`;

      // Kirim email reset password
      const subject = 'Reset Password';
      const data = {
        username: users.name,
        link: URL,
      };

      console.log('username yang akan dikirim', data.username);

      await sendEmailForgotPass(email, subject, data);
      return res.status(200).send('Reset password email sent successfully!');
    } catch (error) {
      next(error);
    }
  }

  // Task 5: Doing Reset Password
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
}
