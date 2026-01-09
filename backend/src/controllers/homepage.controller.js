import { HomePage } from "../models/HomePage.model";
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
    const homepage = await HomePage.findOneAndUpdate(
      {},               // match any document (only one exists)
      { $set: req.body },
      {
        new: true,      // return updated doc
        upsert: true,   // CREATE if not exists
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Homepage saved successfully",
      data: homepage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save homepage",
      error: error.message,
    });
  }
};
