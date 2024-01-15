import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Comment } from "../models/comment.model.js";
import { Video } from "../models/video.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

const addComment = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const { videoId } = req.params;

    if (!content || !content.trim()) {
        throw new ApiError(400, "content is required!");
    }

    if (!mongoose.isValidObjectId(videoId)) {
        throw new ApiError(400, "invalid video id");
    }

    const videoToAddComment = await Video.findById(videoId);

    if (!videoToAddComment) {
        throw new ApiError(400, "video does not exist");
    }

    const comment = await Comment.create({
        owner: req.user?._id,
        video: videoToAddComment?._id,
        content: content,
    });

    if (!comment) {
        throw new ApiError(500, "error while creating comment");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, comment, "new comment added."));
});

const updateComment = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const { commentId } = req.params;

    if (!content || !content.trim()) {
        throw new ApiError(400, "content is required!");
    }

    if (!mongoose.isValidObjectId(commentId)) {
        throw new ApiError(400, "invalid comment id");
    }

    const comment = await Comment.findByIdAndUpdate(
        commentId,
        {
            $set: {
                content: content,
            },
        },
        { new: true }
    );

    if (!comment) {
        throw new ApiError(400, "comment does not exist");
    }

    return res
        .status(201)
        .json(new ApiResponse(200, comment, "comment updated."));
});

const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    if (!mongoose.isValidObjectId(commentId)) {
        throw new ApiError(400, "invalid comment id");
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(400, "comment does not exist");
    }

    if (!(comment.owner != req.user?._id)) {
        throw new ApiError(401, "you cannot delete others comment.");
    }

    await Comment.deleteOne({ _id: comment._id });

    return res
        .status(204)
        .json(new ApiResponse(204, {}, "comment deleted successfully"));
});

const getComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    if (!mongoose.isValidObjectId(commentId)) {
        throw new ApiError(400, "invalid comment id");
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
        throw new ApiError(400, "comment does not exist");
    }

    return res
        .status(201)
        .json(new ApiResponse(200, comment, "comment fetched successfully."));
});

export { addComment, updateComment, deleteComment, getComment };
