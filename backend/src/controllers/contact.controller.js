import { ContactMessage } from "../models/ContactMessage.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { sendEmail } from "../utils/sendEmail.js";

/* ---------------- USER: SUBMIT MESSAGE ---------------- */
export const submitContactForm = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    budget,
    timeline,
    services,
    message
  } = req.body;

  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const contact = await ContactMessage.create({
    firstName,
    lastName,
    email,
    budget,
    timeline,
    services,
    message
  });

  return res.status(201).json(
    new ApiResponse(201, contact, "Message submitted successfully")
  );
});

/* ---------------- ADMIN: GET ALL MESSAGES ---------------- */
export const getAllMessages = asyncHandler(async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, messages, "Messages fetched"));
});

/* ---------------- ADMIN: RESPOND TO USER ---------------- */
export const respondToMessage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { responseMessage } = req.body;

  if (!responseMessage) {
    throw new ApiError(400, "Response message is required");
  }

  const contact = await ContactMessage.findById(id);

  if (!contact) {
    throw new ApiError(404, "Message not found");
  }

  // Generate the Professional HTML
  const emailHtml = createCoolEmailTemplate(contact.firstName, responseMessage);

  await sendEmail({
    to: contact.email,
    subject: "Response from ODE Studio",
    html: emailHtml,
  });

  contact.adminResponse = {
    message: responseMessage,
    respondedAt: new Date()
  };
  contact.isRead = true;

  await contact.save();

  return res.status(200).json(
    new ApiResponse(200, contact, "Response sent successfully")
  );
});

// --- MODERN & CENTERED TEMPLATE ---
const createCoolEmailTemplate = (name, message) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        /* CSS Reset for Email Clients */
        body { margin: 0; padding: 0; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        img { border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
        
        /* Font Import (Optional - some clients will strip this, falling back to sans-serif) */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
      </style>
    </head>
    
    <body style="background-color: #f3f4f6; margin: 0; padding: 0;">
      
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f3f4f6; width: 100%;">
        <tr>
          <td align="center" style="padding: 40px 10px;">
            
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="width: 100%; max-width: 600px;">
              <tr>
                <td align="center" style="padding: 0;">
                  
                  <div style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); overflow: hidden; text-align: left;">
                    
                    <div style="height: 6px; background: linear-gradient(90deg, #6366f1 0%, #a855f7 100%); width: 100%;"></div>

                    <div style="padding: 30px 40px 20px 40px; border-bottom: 1px solid #f0f0f0;">
                       <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 700; color: #111827; letter-spacing: -0.5px;">
                          ODE STUDIO
                       </div>
                    </div>

                    <div style="padding: 30px 40px;">
                      
                      <h1 style="margin: 0 0 20px 0; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 18px; color: #111827; font-weight: 600;">
                        Hi ${name || "there"},
                      </h1>
                      
                      <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #4b5563; white-space: pre-wrap;">
                        ${message}
                      </div>

                      <div style="margin: 30px 0; border-top: 1px dashed #e5e7eb;"></div>

                      <p style="margin: 0; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 14px; color: #6b7280;">
                        Best regards,<br>
                        <span style="color: #111827; font-weight: 600;">The ODE Studio Team</span>
                      </p>
                    </div>

                    <div style="background-color: #f9fafb; padding: 20px 40px; text-align: center;">
                       <p style="margin: 0; font-family: 'Inter', Helvetica, Arial, sans-serif; font-size: 12px; color: #9ca3af;">
                         &copy; ${new Date().getFullYear()} ODE Studio. All rights reserved.
                       </p>
                    </div>

                  </div>
                  </td>
              </tr>
            </table>

          </td>
        </tr>
      </table>

    </body>
    </html>
  `;
};
