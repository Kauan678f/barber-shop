import nodemailer from 'nodemailer';

export async function sendCodeEmail(to: string, code: string) {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS?.replace(/\s/g, '');

  if (!user || !pass) throw new Error('EMAIL_USER/EMAIL_PASS ausentes');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // senha de app (16 chars)
    },
});

  await transporter.verify();

  await transporter.sendMail({
    from: `"Suporte" <${user}>`,
    to,
    subject: 'Código de verificação',
    html: `<h2>Seu código</h2><h1>${code}</h1>`,
  });
}
