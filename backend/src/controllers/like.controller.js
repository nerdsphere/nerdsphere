import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Like } from './../models/like.models.js';

const toggleLike = async (Model, resourceId, userId) => {
    if (!isValidObjectId(resourceId)) {
        throw new ApiError(400, "Invalid Resource Id");
    }
    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid User Id");
    }

    const resource = await Model.findById(resourceId);
    if (!resource) {
        throw new ApiError(404, "No Resource Found");
    }

    const resourceField = Model.modelName.toLowerCase();

    const isLiked = await Like.findOne({ [resourceField]: resourceId, likedBy: userId });

    let response;
    try {
        response = isLiked ?
            await Like.deleteOne({ [resourceField]: resourceId, likedBy: userId }) :
            await Like.create({ [resourceField]: resourceId, likedBy: userId });
    } catch (error) {
        console.error("toggleLike error:", error);
        throw new ApiError(500, error?.message || "Internal server error in toggleLike");
    }

    const totalLikes = await Like.countDocuments({ [resourceField]: resourceId });

    return { response, isLiked, totalLikes };
};

const togglePostLike = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { response, isLiked, totalLikes } = await toggleLike(Post, postId, req.user?._id);

    return res.status(200).json(
        new ApiResponse(
            200,
            { response, totalLikes },
            isLiked === null ? "Liked Successfully" : "Removed Like Successfully"
        )
    );
});

const toggleReplyLike = asyncHandler(async (req, res) => {
    const { replyId } = req.params;
    const { response, isLiked, totalLikes } = await toggleLike(Reply, replyId, req.user?._id);

    return res.status(200).json(
        new ApiResponse(
            200,
            { response, totalLikes },
            isLiked === null ? "Liked Reply Successfully" : "Removed Like from Reply Successfully"
        )
    );
});

const toggleAnswerLike = asyncHandler(async (req, res) => {
    const { answerId } = req.params;
    const { response, isLiked, totalLikes } = await toggleLike(Answer, answerId, req.user?._id);

    return res.status(200).json(
        new ApiResponse(
            200,
            { response, totalLikes },
            isLiked === null ? "Liked Answer Successfully" : "Removed Like from Answer Successfully"
        )
    );
});

export {
    togglePostLike,
    toggleReplyLike,
    toggleAnswerLike
};
