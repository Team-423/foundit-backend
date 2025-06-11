import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendClaimNotification = async ({ to, claimantName, itemName }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "team.423.locked@gmail.com",
      subject: "Someone claimed your item!",
      html: `
        <p>Hi there,</p>
        <p><strong>${claimantName}</strong> just claimed your item: <em>${itemName}</em>.</p>
        <p>Head over to the app to review the claim.</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error("Email failed to send");
    }

    return data;
  } catch (err) {
    console.error("Email sending error:", err);
    throw err;
  }
};
