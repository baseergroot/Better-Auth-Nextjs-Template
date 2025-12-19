import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, text, html }: { to: string; subject: string; text: string; html: string }) {
  try {
    const response = await resend.emails.send({
    from: `Demo App <${process.env.EMAIL_FROM || "onboarding@resend.dev"}>`,
    to,
    subject,
    text,
    html,
  });
  console.log("email sent", response, text);
  return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
