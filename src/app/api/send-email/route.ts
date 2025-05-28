import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { email, message } = await request.json();

  // Configure your email transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", // e.g., 'gmail'
    auth: {
      user: process.env.EMAIL_USER, // your email from env
      pass: process.env.EMAIL_PASS, // your email app password from env
    },
  });

  console.log({ email, message });

  const mailOptions = {
    from: "audielorenz18@gmail.com", // your actual Gmail account
    to: "audielorenz18@gmail.com",
    subject: "Portfolio - Inquiries",
    text: `You received a new message from: ${email}\n\nMessage:\n${message}`,
    replyTo: email, // 👈 this lets you click "Reply" and it goes to the user
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, info });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error });
  }
}
