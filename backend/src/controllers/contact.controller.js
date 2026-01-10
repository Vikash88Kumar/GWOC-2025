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

  await sendEmail({
    to: contact.email,
    subject: "Response from ODE Studio",
    html: `
      <p>Hi ${contact.firstName || "there"},</p>
      <p>${responseMessage}</p>
      <br />
      <p>— ODE Studio</p>
    `
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
