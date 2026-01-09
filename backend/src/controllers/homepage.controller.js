import { HomePage } from "../models/HomePage.model";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const getHomePage=asyncHandler(async(req,res)=>{
    const homePage=await HomePage.findOne();
    if(!homePage){
        throw new ApiError(404,"HomePage data not found");
    }
    res.status(200).json(new ApiResponse(200,"HomePage data fetched successfully",homePage));
})