import nodemailer from "nodemailer";

type SendCodeEmailInput = {
  to: string;               // email do destinatário
  code: string;             // código (ex: 6 dígitos)
  subject?: string;         // opcional
  expiresMinutes?: number;  // opcional (só pra texto do email)
};

export async function sendCodeEmail({
  to,
  code,
  subject = "Seu código de verificação",
  expiresMinutes = 10,
}: SendCodeEmailInput) {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error("EMAIL_USER ou EMAIL_PASS não estão definidos no .env");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  // Garante que as credenciais estão ok (ajuda MUITO a debugar)
  await transporter.verify();

  const info = await transporter.sendMail({
    from: `"Suporte" <${user}>`,
    to,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.4">
        <h2>Seu código de verificação</h2>
        <p>Use o código abaixo para continuar:</p>
        <div style="font-size: 28px; font-weight: bold; letter-spacing: 4px">
          ${code}
        </div>
        <p style="margin-top: 12px; color: #555">
          Esse código expira em ${expiresMinutes} minuto(s).
        </p>
      </div>
    `,
  });

  return {
    messageId: info.messageId,
    accepted: info.accepted,
    rejected: info.rejected,
  };
}
