import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import { transporter } from '@/lib/nodemailer';

// Fungsi untuk mengirim email forgot password
export const sendEmailForgotPass = async (email: string, subject: string, data?: { username: string; link: string }, content?: string) => {
    try {
        // Baca template forgot-pass.hbs
        const templatePath = path.join(__dirname, '../templates', 'forgot-password.hbs');
        const templateSource = await fs.promises.readFile(templatePath, 'utf-8');

        // Kompilasi template menggunakan Handlebars
        const compileTemplate = handlebars.compile(templateSource);

        // Data untuk disertakan dalam email
        const html = compileTemplate(data);

        // Kirim email
        await transporter.sendMail({
            from: process.env.MAIL_SENDER, // Ganti dengan email pengirim Anda
            to: email,
            subject: subject,
            html: html || content
        });
    } catch (error) {
        throw error;
    }
}
