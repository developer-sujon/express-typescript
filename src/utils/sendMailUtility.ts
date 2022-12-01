//External Lib Import
import nodemailer from 'nodemailer';
import { email } from '../config/config';

export const sendMailUtility = async (
  emailTo: string,
  emailSubject: string,
  emailText: string
) => {
  let transporter = await nodemailer.createTransport(email.smtp);

  const mailOption = {
    from: `${process.env.APPLICATION_NAME} <${email.from}>`,
    to: emailTo,
    subject: emailSubject,
    html: emailText,
  };

  return await transporter.sendMail(mailOption);
};
