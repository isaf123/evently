import prisma from "@/prisma";
import { findUsers } from "@/services/auth/login/findFirstUser";
import { checkExistingUsers } from "@/services/auth/register/checkUsers";
import { createUsers } from "@/services/auth/register/createUsers";
import { Role } from "@/services/auth/register/typeUsers";
import { validateEmail } from "@/utils/emailValidator";
import { hashPassword } from "@/utils/hashPassword";
import { NextFunction, Request, Response } from "express";
import { sign } from 'jsonwebtoken'
import { compareSync } from 'bcrypt'
import { updateLoginAttempt } from "@/services/auth/login/updateLoginAttempt";
import { activateAccount } from "@/services/auth/login/activateAccount";
import { findUniqueUsers } from "@/services/auth/forgotPassword/findUniqueUser";
import { saveResetToken } from "@/services/auth/forgotPassword/saveResetToken";
import { sendEmailForgotPass } from "@/utils/emailSendForgotPassword";


export class AuthController {
    // Task 1: Doing Register
    async registerUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, email, password, role, referral_code } = req.body
            if (!validateEmail(email)) return res.status(400).json('Email not valid!');
            const existingUser = await checkExistingUsers(email)
            if (existingUser) return res.status(409).json("Email Already Registered.");
            if (!Object.values(Role).includes(role)) return res.status(400).json(`${role} not valid`);
            const hashedPassword = await hashPassword(password)
            const newUsers = await createUsers({
                name, email, password: hashedPassword, role, referral_code
            })
            return res.status(201).send(newUsers)
        } catch (error) {
            next(error)
        }
    }

    // Task 2: Doing Login
    async loginUsers(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body
        try {
            if (!email || !password) {
                return res.status(400).send('Account not found!')
            }
            const findUser = await findUsers(email, email)
            if (!findUser) return res.status(404).send('Account not exists')

            const differentDay = Date.now() > new Date(findUser?.updatedAt).getTime();
            if (differentDay) {
                await updateLoginAttempt(findUser.id, 0)
            }

            if (!findUser.isActive) {
                // Memberikan penundaan 1 menit jika akun dinonaktifkan
                setTimeout(async () => {
                    await activateAccount(findUser.id); // Mengaktifkan kembali akun setelah 1 menit
                }, 45000); // 1 menit dalam milidetik

                return res.status(429).send('Your account is Suspended!')
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
                    return res.status(400).send(`Password Incorect, ${4 - limitcount} chance remaining`)
                } else {
                    await prisma.users.update({
                        where: { id: findUser.id },
                        data: { isActive: false },
                    });
                    setTimeout(async () => {
                        await activateAccount(findUser.id); // Mengaktifkan kembali akun setelah 1 menit
                    }, 60000);
                    return res.status(400).send(`Your Account is Suspend!`)
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
                process.env.TOKEN_KEY || "secret"
            );
            return res.status(200).send({
                username: findUser.name,
                email: findUser.email,
                role: findUser.role,
                token: token,
            });


        } catch (error) {
            next(error)
        }
    }

    // Task 3: Doing Keep Login
    async keepLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = res.locals.decript.id
            console.log('ini user dengan response locals', userId);

            const user = await prisma.users.findUnique({
                where: { id: userId }
            })
            if (!user) {
                return res.status(404).send('User not found')
            }
            const token = sign({ id: userId, role: user.role }, process.env.TOKEN_KEY || 'secret', { expiresIn: "5m" })
            return res.status(200).send({
                username: user.name,
                email: user.email,
                role: user.role,
                token
            })
        } catch (error) {
            next(error)
        }
    }

    // Task 4: Doing Forgot Password
    async forgotPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body
            const users = await findUniqueUsers(email)
            if (!users) return res.status(404).send('Account not found!')
            const token = sign({ userId: users.id }, process.env.TOKEN_KEY || 'secretpassforgot')
            await saveResetToken(users.id, token)

            const URL = `http://localhost:3000/reset-password/${token}`

            // Kirim email reset password
            const subject = "Reset Password";
            const data = {
                username: users.name,
                link: URL
            };

            console.log('username yang akan dikirim', data.username);

            await sendEmailForgotPass(email, subject, data)
            return res.status(200).send('Reset password email sent successfully!');
        } catch (error) {
            next(error)
        }
    }

    // Task 5: Doing Reset Password
    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (error) {
            next(error)
        }
    }
}