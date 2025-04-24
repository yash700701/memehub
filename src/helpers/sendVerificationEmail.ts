

import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (to: string, userName: string, code: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"MemeHub" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Verify Your Email',
    html: `
      <h2>Hello ${userName},</h2>
      <p>Here is your verification code:</p>
      <h3 style="color: #3b82f6;">${code}</h3>
      <p>This code is valid for 1 hour only.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

