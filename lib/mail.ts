import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Optional: Verifies the transporter connection. 
export async function verifyTransporter() {
  try {
    await transporter.verify();
    console.log("Mail transporter is ready");
  } catch (error) {
    console.error("Mail transporter failed:", error);
  }
}

export async function sendMail({to,subject,html,text,}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: `"Aman Tailor" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text: text ?? "",
      html,
    });

    return { success: true };
  } catch (err) {
    console.error("❌ Error sending email:", err);
    return { success: false, error: err };
  }
}
