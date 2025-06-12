import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendClaimNotification = async ({
  to,
  claimantName,
  itemName,
  item_id,
  questionAndAnswerPairs = [],
}) => {
  try {
    const qaHtml = questionAndAnswerPairs
      .map(
        (qa, index) => `
      <div style="margin-bottom: 15px; padding: 18px; background-color: #f8f9fa; border-left: 4px solid #168aad; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.08);">
        <p style="margin: 0 0 12px 0; font-weight: 600; color: #22577A; font-size: 15px;">
          Q${index + 1}: ${qa.question}
        </p>
        <p style="margin: 0; color: #555; font-style: italic; font-size: 14px; line-height: 1.6;">
          A: ${qa.answer}
        </p>
      </div>
    `
      )
      .join("");

    const { data, error } = await resend.emails.send({
      from: "FoundIt <onboarding@resend.dev>",
      to: "team.423.locked@gmail.com",
      subject: "Someone claimed your item!",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Item Claim Notification</title>
</head>
<body style="margin: 0; padding: 20px; background-color: #f5f5f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, Arial, sans-serif;">

  <!-- Optional fallback view link -->
  <p style="font-size: 13px; color: #888; text-align: center; margin-bottom: 20px;">
    Trouble viewing this email? <a href="https://see-it-post-it-foundit.netlify.app/items/${item_id}" style="color: #168aad;">Click here</a> to open in browser.
  </p>

  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1); overflow: hidden;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #9FD8CE 0%, #81C3B7 100%); padding: 35px 25px; text-align: center;">
      <img src="https://see-it-post-it-foundit.netlify.app/images/logo/found-it-logo-trimmed.png" 
           alt="FoundIt Logo" 
           style="height: 80px; width: auto; margin-bottom: 15px; display: block; margin-left: auto; margin-right: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />
      <h3 style="color: #e8f4f8; margin: 8px 0 0 0; font-size: 16px; font-weight: 500;">See it. Post it. Found it.</h3>
    </div>
    
    <!-- Content -->
    <div style="padding: 35px 30px;">
      <p style="margin: 0 0 25px 0; color: #333; font-size: 18px; line-height: 1.6; font-weight: 500;">Hi there! 👋</p>
      
      <div style="background: linear-gradient(135deg, #f0f8ff 0%, #e8f4f8 100%); padding: 25px; border-radius: 12px; border-right: 5px solid #81C3B7; margin: 25px 0; box-shadow: 0 3px 10px rgba(0,0,0,0.05);">
        <p style="margin: 0; color: #333; font-size: 17px; line-height: 1.7;">
          <strong style="color: #22577A; font-size: 18px;">${claimantName}</strong> just claimed your item: 
          <em style="color: #168aad; font-weight: 600; font-size: 17px;">"${itemName}"</em>
        </p>
      </div>
      
      ${
        qaHtml.length > 0
          ? `
        <div style="margin: 30px 0;">
          <h3 style="color: #22577A; margin: 0 0 25px 0; font-size: 20px; font-weight: 700; border-bottom: 3px solid #e8f4f8; padding-bottom: 12px;">
            📝 Claimant's Verification Answers
          </h3>
          ${qaHtml}
        </div>
      `
          : ""
      }
      
      <div style="text-align: center; margin: 35px 0;">
        <a href="https://see-it-post-it-foundit.netlify.app/items/${item_id}" 
           style="display: inline-block; background: linear-gradient(135deg, #168aad 0%, #22577A 100%); color: #ffffff; padding: 16px 32px; border-radius: 30px; text-decoration: none; font-weight: 700; font-size: 17px; box-shadow: 0 4px 15px rgba(22, 138, 173, 0.4); transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 0.5px;">
          🔍 Review Claim
        </a>
      </div>
      
      <div style="border-top: 2px solid #e8f4f8; padding-top: 25px; margin-top: 35px;">
        <p style="margin: 0 0 18px 0; color: #555; font-size: 15px; line-height: 1.7;">
          Please review the claim details and contact the claimant if everything looks correct. 
          Your item might finally be going home! 🏠
        </p>
        <p style="margin: 0; color: #168aad; font-size: 15px; font-style: italic; font-weight: 500;">
          Thanks for making the world a more connected place ✨
        </p>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="background: linear-gradient(135deg, #f8f9fa 0%, #f0f2f5 100%); padding: 25px 20px; text-align: center; border-top: 2px solid #e8f4f8;">
      <p style="margin: 0; color: #555; font-size: 14px; line-height: 1.6;">
        Best regards,<br>
        <strong style="color: #22577A; font-size: 15px;">The FoundIt Team</strong>
      </p>
      <p style="margin: 15px 0 0 0; color: #888; font-size: 12px; font-style: italic;">
        This email was sent because someone claimed an item you posted on FoundIt.
      </p>
      <!-- Unique string to avoid Gmail trimming -->
      <p style="font-size: 11px; color: #bbb; margin-top: 12px;">Email ID: ${item_id} · ${Date.now()}</p>
    </div>
    
  </div>
</body>
</html>
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
