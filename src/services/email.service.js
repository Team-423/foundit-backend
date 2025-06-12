import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendClaimNotification = async ({
  to,
  claimantName,
  itemName,
  item_id,
}) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "FoundIt <onboarding@resend.dev>",
      to: "team.423.locked@gmail.com",
      subject: "Someone claimed your item!",
      html: `
     <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto;">
      <p>Hi there,</p>
      
      <p>
        <strong style="color: #22577A;">${claimantName}</strong> just claimed your item: 
        <em style="color: #555;">${itemName}</em> on <strong>FoundIt</strong>.
      </p>
      
      <p>
        Head over to the app to review the claim:<br>
        <a href="https://see-it-post-it-foundit.netlify.app/items/${item_id}" 
           style="display: inline-block; margin-top: 10px; background-color: #168aad; color: #fff; padding: 10px 16px; border-radius: 6px; text-decoration: none;">
          Review Claim
        </a>
      </p>

      <p>Thanks for making the world a better place :)</p>

      <p style="margin-top: 30px;">
        Regards,<br>
        <strong>The FoundIt Team</strong>
      </p>
    </div>
      `,
    });

    if (error) {
      throw new Error("Email failed to send");
    }
    return data;
  } catch (err) {
    throw err;
  }
};
