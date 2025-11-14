import nodemailer from "nodemailer";
import twilio from "twilio";

// Email transporter
const emailTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Twilio client
const twilioClient = process.env.TWILIO_ACCOUNT_SID
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

export const sendEmail = async (to, subject, html) => {
  try {
    const info = await emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    console.log("Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};

export const sendSMS = async (phoneNumber, message) => {
  if (!twilioClient) {
    console.warn("Twilio not configured. SMS would be sent to:", phoneNumber);
    return { success: true, message: "SMS delivery simulated" };
  }

  try {
    const result = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
    console.log("SMS sent:", result.sid);
    return { success: true, sid: result.sid };
  } catch (error) {
    console.error("Error sending SMS:", error);
    return { success: false, error: error.message };
  }
};

export const send2FACodeEmail = async (email, code) => {
  const html = `
    <h2>Your 2FA Code</h2>
    <p>Your verification code is:</p>
    <h1 style="font-size: 32px; letter-spacing: 5px; color: #4f46e5;">${code}</h1>
    <p>This code will expire in 10 minutes.</p>
    <p style="color: #666; font-size: 12px;">If you didn't request this code, please ignore this email.</p>
  `;
  return sendEmail(email, "Your 2FA Code", html);
};

export const send2FACodeSMS = async (phoneNumber, code) => {
  const message = `Your Pocket Democracy verification code is: ${code}\n\nValid for 10 minutes.`;
  return sendSMS(phoneNumber, message);
};
