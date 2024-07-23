import mongoose, { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Dislike } from './../models/dislike.model.js'; // Assuming your Dislike model is imported correctly

const toggleDislike = async (Model, resourceId, userId) => {
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

    const isDisliked = await Dislike.findOne({ [resourceField]: resourceId, dislikedBy: userId });

    let response;
    try {
        response = isDisliked ?
            await Dislike.deleteOne({ [resourceField]: resourceId, dislikedBy: userId }) :
            await Dislike.create({ [resourceField]: resourceId, dislikedBy: userId });
    } catch (error) {
        console.error("toggleDislike error:", error);
        throw new ApiError(500, error?.message || "Internal server error in toggleDislike");
    }

    const totalDislikes = await Dislike.countDocuments({ [resourceField]: resourceId });

    return { response, isDisliked, totalDislikes };
};

const togglePostDislike = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { response, isDisliked, totalDislikes } = await toggleDislike(Post, postId, req.user?._id);

    return res.status(200).json(
        new ApiResponse(
            200,
            { response, totalDislikes },
            isDisliked === null ? "Disliked Successfully" : "Removed Dislike Successfully"
        )
    );
});

const toggleReplyDislike = asyncHandler(async (req, res) => {
    const { replyId } = req.params;
    const { response, isDisliked, totalDislikes } = await toggleDislike(Reply, replyId, req.user?._id);

    return res.status(200).json(
        new ApiResponse(
            200,
            { response, totalDislikes },
            isDisliked === null ? "Disliked Reply Successfully" : "Removed Dislike from Reply Successfully"
        )
    );
});

const toggleAnswerDislike = asyncHandler(async (req, res) => {
    const { answerId } = req.params;
    const { response, isDisliked, totalDislikes } = await toggleDislike(Answer, answerId, req.user?._id);

    return res.status(200).json(
        new ApiResponse(
            200,
            { response, totalDislikes },
            isDisliked === null ? "Disliked Answer Successfully" : "Removed Dislike from Answer Successfully"
        )
    );
});

export {
    togglePostDislike,
    toggleReplyDislike,
    toggleAnswerDislike,
};
