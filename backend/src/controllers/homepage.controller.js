import { HomePage } from "../models/HomePage.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const getHomePage=asyncHandler(async(req,res)=>{
    try {
        const homePage=await HomePage.findOne();
        if(!homePage){
            throw new ApiError(404,"HomePage data not found");
        }
        res.status(200).json(new ApiResponse(200,"HomePage data fetched successfully",homePage));
    } catch (error) {
        throw new ApiError(500,"Failed to fetch HomePage data");
    }
})


export const upsertHomePage = async (req, res) => {
  try {
    const {
      hero,
      projects,
      stats,
    } = req.body;

    const homepage = await HomePage.findOneAndUpdate(
      {}, // only ONE homepage document
      {
        hero,
        projects,
        stats,
      },
      {
        new: true,        // return updated document
        upsert: true,     // create if not exists
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Homepage saved successfully",
      data: homepage,
    });
  } catch (error) {
    console.error("Homepage Update Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save homepage",
      error: error.message,
    });
  }
};

