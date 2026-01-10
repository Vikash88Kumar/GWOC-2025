

export const toggleTestimonialActive = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const testimonial = await Testimonial.findById(id);

  if (!testimonial) {
    throw new ApiError(404, "Testimonial not found");
  }

  testimonial.isActive = !testimonial.isActive;
  await testimonial.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      testimonial,
      `Testimonial is now ${testimonial.isActive ? "active" : "inactive"}`
    )
  );
});
