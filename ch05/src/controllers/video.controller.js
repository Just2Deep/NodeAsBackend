import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";
// import { User } from "../models/user.model.js";
import {
    deleteFromCloudinary,
    uploadOnCloudinary,
} from "../utils/cloudinary.js";
import mongoose from "mongoose";

const getImageExtensionOfVideo = (filename) => {
    const jpg_path = filename.substring(0, filename.lastIndexOf(".")) + ".jpg";
};

const uploadVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    if (!(title && description)) {
        throw new ApiError(400, "all fields are required!");
    }

    const videoLocalPath = req.file?.path;

    if (!videoLocalPath) {
        throw new ApiError(400, "no video file found");
    }

    const video = await uploadOnCloudinary(videoLocalPath);

    if (!video) {
        throw new ApiError(500, "error uploading to cloudinary");
    }

    const thumbnail =
        video?.url.substring(0, video.url.lastIndexOf(".")) + ".jpg";

    const newVideo = await Video.create({
        videoFile: video.url, // cloudinary url
        thumbnail: thumbnail, // cloudinary url
        title: title,
        description: description,
        duration: video.duration,
        owner: req.user?._id,
    });

    if (!newVideo) {
        throw new ApiError(500, "error uploading data");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, newVideo, "new video uploaded successfully!")
        );
});

export { uploadVideo };
