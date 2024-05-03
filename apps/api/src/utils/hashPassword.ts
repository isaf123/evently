import { genSalt, hash } from 'bcrypt'

export const hashPassword = async (password: string, saltRound: number = 10) => {
    const salt = await genSalt(saltRound)
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
}