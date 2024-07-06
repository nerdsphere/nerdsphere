import mongoose, { isValidObjectId } from "mongoose";
import { Reply } from "../models/reply.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createReply = asyncHandler(async (req, res) => {
    const owner = req.user._id;
    const { content, postId } = req.body;

    if (!content || !content.trim()) {
        throw new ApiError(400, "Reply content is required");
    }

    const reply = await Reply.create({ owner, content, posts: postId });

    return res
        .status(200)
        .json(new ApiResponse(200, reply, "Reply created successfully"));
});

const getRepliesByPost = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    if (!isValidObjectId(postId)) {
        throw new ApiError(400, "Invalid Post ID");
    }

    const replies = await Reply.find({ posts: postId }).populate("owner");

    return res
        .status(200)
        .json(new ApiResponse(200, replies, "Replies fetched successfully"));
});

const deleteReply = asyncHandler(async (req, res) => {
    const { replyId } = req.params;

    if (!isValidObjectId(replyId)) {
        throw new ApiError(400, "Invalid Reply ID");
    }

    const deletedReply = await Reply.findByIdAndDelete(replyId);

    return res
        .status(200)
        .json(new ApiResponse(200, deletedReply, "Reply deleted successfully"));
});

export {
    createReply,
    getRepliesByPost,
    deleteReply
};
