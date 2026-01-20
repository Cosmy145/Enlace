import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendOTPEmail = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  // Don't add spaces - use CSS letter-spacing for visual separation
  const otpDigits = otp;

  const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your login - Enlace</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f7;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 500px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);">
          <!-- Header with Logo -->
          <tr>
            <td align="center" style="padding: 40px 40px 24px 40px;">
              <table role="presentation" style="border-collapse: collapse;">
                <tr>
                  <td style="vertical-align: middle;">
                      <img src="${
                        process.env.LOGO_URL
                      }" alt="Enlace Logo" width="20" height="20" style="display: block;" />
                  </td>
                  <td style="padding-left: 10px; vertical-align: middle;">
                    <span style="font-size: 24px; font-weight: 700; color: #1a1a1a;">Enlace</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Title -->
          <tr>
            <td align="center" style="padding: 0 40px 16px 40px;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #1a1a1a;">Verify your login</h1>
            </td>
          </tr>
          
          <!-- Subtitle -->
          <tr>
            <td align="center" style="padding: 0 40px 32px 40px;">
              <p style="margin: 0; font-size: 15px; color: #6b7280; line-height: 1.6;">
                Please enter the following verification code to access your Enlace desktop account.
              </p>
            </td>
          </tr>
          
          <!-- OTP Code Box -->
          <tr>
            <td align="center" style="padding: 0 40px 16px 40px;">
              <div style="background: linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%); border-radius: 16px; padding: 32px 24px;">
                <div style="font-size: 42px; font-weight: 600; color: #7c3aed; letter-spacing: 16px; font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Mono', monospace; white-space: nowrap;">
                  ${otpDigits}
                </div>
              </div>
            </td>
          </tr>
          
          <!-- Expiry Notice -->
          <tr>
            <td align="center" style="padding: 0 40px 32px 40px;">
              <p style="margin: 0; font-size: 14px; color: #7c3aed; font-weight: 500;">
                This code will expire in 5 minutes.
              </p>
            </td>
          </tr>
          
          <!-- Security Notice Box -->
          <tr>
            <td align="center" style="padding: 0 40px 40px 40px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #fafafa; border-radius: 12px; border: 1px solid #e5e7eb;">
                <tr>
                  <td style="padding: 20px;">
                    <table role="presentation" style="border-collapse: collapse;">
                      <tr>
                        <td style="vertical-align: top; padding-right: 16px;">
                          <div style="background-color: #f3e8ff; padding: 10px; border-radius: 8px;">
                            <span style="font-size: 16px;">🔒</span>
                          </div>
                        </td>
                        <td style="vertical-align: top;">
                          <p style="margin: 0 0 4px 0; font-size: 14px; font-weight: 600; color: #1a1a1a;">Security Notice</p>
                          <p style="margin: 0; font-size: 13px; color: #6b7280; line-height: 1.5;">
                            Never share this code. Enlace employees will never ask for it. If you didn't request this code, you can safely ignore this email.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 0;">
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 24px 40px;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #9ca3af;">
                © ${new Date().getFullYear()} Enlace WebRTC. All rights reserved.
              </p>
              <p style="margin: 0 0 8px 0; font-size: 12px;">
                <a href="#" style="color: #6b7280; text-decoration: none; margin-right: 16px;">Help Center</a>
                <a href="#" style="color: #6b7280; text-decoration: none;">Unsubscribe</a>
              </p>
              <p style="margin: 8px 0 0 0; font-size: 11px; color: #9ca3af;">
                Sent securely via Enlace Authentication System
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const mailOptions = {
    // from: '"Enlace" <' + process.env.GMAIL_USER + ">",
    from: "Enlace <enlace@enlace.com>",
    to: email,
    subject: "Your verification code for Enlace",
    text: `Your OTP is ${otp}. This OTP is valid for 5 minutes.`,
    html: htmlTemplate,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✓ Email sent successfully:", email);
    return info;
  } catch (error: any) {
    console.error("✗ Email sending failed:");
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    console.error("Response:", error.response);
    throw error;
  }
};
