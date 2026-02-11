import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Send to yourself
      subject: "❤️ Valentine's Site Notification",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: linear-gradient(135deg, #fff5f7 0%, #ffe5ec 100%);">
          <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 10px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h2 style="color: #ff4d6d; margin-top: 0;">💌 Valentine's Notification</h2>
            <p style="font-size: 16px; color: #333; line-height: 1.6;">
              ${message}
            </p>
            <hr style="border: none; border-top: 2px solid #ffafcc; margin: 20px 0;">
            <p style="font-size: 12px; color: #999; margin-bottom: 0;">
              Sent at ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent!" });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
