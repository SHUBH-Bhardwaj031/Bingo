import nodemailer from 'nodemailer'

// Gmail example — for Gmail you need an "App Password", not your normal password.
// Google Account -> Security -> 2-Step Verification -> App Passwords

export const sendResetEmail = async (toEmail, resetLink) => {
  // transporter created HERE (inside the function), not at the top of the file —
  // this guarantees process.env is already loaded by the time this runs
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,      // e.g. yourapp@gmail.com
      pass: process.env.EMAIL_PASS,      // 16-char app password
    },
  })

  const mailOptions = {
    from: `"Bingo" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: 'Reset your Bingo password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto;">
        <h2 style="color: #ea580c;">Reset your password</h2>
        <p>We received a request to reset your Bingo password. Click the button below — this link expires in 15 minutes.</p>
        <a href="${resetLink}" style="display:inline-block; padding:12px 24px; background:#ea580c; color:#fff; text-decoration:none; border-radius:8px; margin:16px 0;">
          Reset Password
        </a>
        <p>If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}