import { ContactPage } from "../models/ContactPage.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

/* -------------------------------------------------
   GET CONTACT PAGE
-------------------------------------------------- */
export const getContactPage = asyncHandler(async (req, res) => {
  const page = await ContactPage.findOne();

  if (!page) {
    throw new ApiError(404, "Contact page not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, page, "Contact page fetched successfully"));
});

/* -------------------------------------------------
   CREATE / UPDATE FULL PAGE
-------------------------------------------------- */
export const updateContactPage = asyncHandler(async (req, res) => {
  const page = await ContactPage.findOneAndUpdate(
    {},
    { $set: req.body },
    {
      new: true,
      runValidators: true,
      upsert: true
    }
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      page,
      "Contact page created/updated successfully"
    )
  );
});

/* -------------------------------------------------
   HERO SECTION
-------------------------------------------------- */
export const updateHeroSection = asyncHandler(async (req, res) => {
  const updates = {};

  for (const [key, value] of Object.entries(req.body)) {
    updates[`hero.${key}`] = value;
  }

  const page = await ContactPage.findOneAndUpdate(
    {},
    { $set: updates },
    {
      new: true,
      runValidators: true,
      upsert: true
    }
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      page.hero,
      "Hero section updated successfully"
    )
  );
});

/* -------------------------------------------------
   FORM SECTION (labels, placeholders, button)
-------------------------------------------------- */
export const updateFormSection = asyncHandler(async (req, res) => {
  const updates = {};

  for (const [key, value] of Object.entries(req.body)) {
    updates[`form.${key}`] = value;
  }

  const page = await ContactPage.findOneAndUpdate(
    {},
    { $set: updates },
    {
      new: true,
      runValidators: true,
      upsert: true
    }
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      page.form,
      "Form section updated successfully"
    )
  );
});

/* -------------------------------------------------
   SERVICES SECTION
-------------------------------------------------- */
export const updateServicesSection = asyncHandler(async (req, res) => {
  if (!Array.isArray(req.body)) {
    throw new ApiError(400, "Services must be an array");
  }

  const page = await ContactPage.findOneAndUpdate(
    {},
    { $set: { services: req.body } },
    {
      new: true,
      runValidators: true,
      upsert: true
    }
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      page.services,
      "Services updated successfully"
    )
  );
});

/* -------------------------------------------------
   FOOTER SECTION
-------------------------------------------------- */
export const updateFooterSection = asyncHandler(async (req, res) => {
  const updates = {};

  for (const [key, value] of Object.entries(req.body)) {
    updates[`footer.${key}`] = value;
  }

  const page = await ContactPage.findOneAndUpdate(
    {},
    { $set: updates },
    {
      new: true,
      runValidators: true,
      upsert: true
    }
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      page.footer,
      "Footer updated successfully"
    )
  );
});
