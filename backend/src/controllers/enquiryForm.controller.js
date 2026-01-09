// 1) Imports (sequence)
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import {Enquiry} from "../models/Enquiry.js"
import {Service} from "../models/Service.js"

// 2) Allowed services (checkbox labels)
const ALLOWED_SERVICES = new Set([
  "Brand Identity",
  "Packaging",
  "Website",
  "Social Media Management",
  "Wedding Invites",
  "Other",
]);

/**
 * POST /api/public/enquiries
 * Body:
 * {
 *   "firstName": "John",
 *   "lastName": "Doe",
 *   "email": "john@gmail.com",
 *   "services": ["Brand Identity", "Website"],
 *   "message": "Anything else you'd like us to know?",
 *   "phone": "optional",
 *   "company": "optional",
 *   "budgetRange": "optional",
 *   "timeline": "optional",
 *   "source": "website"
 * }
 */
const submitEnquiryForm = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    services,
    message,
    phone,
    company,
    budgetRange,
    source,
  } = req.body;

  // Required validations
  if (!firstName || !String(firstName).trim()) throw new ApiError(400, "firstName is required");
  if (!lastName || !String(lastName).trim()) throw new ApiError(400, "lastName is required");
  if (!email || !String(email).trim()) throw new ApiError(400, "email is required");

  // services optional, but if provided it must be array and valid
  let selectedServices = [];
  if (services !== undefined) {
    if (!Array.isArray(services)) throw new ApiError(400, "services must be an array");
    selectedServices = services.map((s) => String(s).trim()).filter(Boolean);

    for (const s of selectedServices) {
      if (!ALLOWED_SERVICES.has(s)) throw new ApiError(400, `Invalid service selected: ${s}`);
    }
  }

  const fullName = `${String(firstName).trim()} ${String(lastName).trim()}`.trim();

  // Optional: map selected service labels -> Service IDs from DB (if you store services there)
  // This will only work if your Service.title matches checkbox labels.
  let serviceIds = [];
  if (selectedServices.length > 0) {
    const matched = await Service.find({ title: { $in: selectedServices } }).select("_id");
    serviceIds = matched.map((x) => x._id);
  }

  const enquiryDoc = await Enquiry.create({
    firstName: String(firstName).trim(),
    lastName: String(lastName).trim(),
    name: fullName,

    email: String(email).trim().toLowerCase(),
    phone: phone ? String(phone).trim() : "",
    company: company ? String(company).trim() : "",

    budgetRange: budgetRange ? String(budgetRange).trim() : "",

    services: selectedServices,     // ✅ array
    serviceIds: serviceIds,         // ✅ array of ObjectIds (optional)

    message: message ? String(message).trim() : "",

    source: source && ["website", "instagram", "other"].includes(source) ? source : "website",
    status: "NEW",
  });

  res.status(201).json({
    ok: true,
    message: "Enquiry submitted successfully",
    id: enquiryDoc._id,
  });
});
export {submitEnquiryForm}