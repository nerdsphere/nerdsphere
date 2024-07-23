import mongoose, { isValidObjectId } from "mongoose";
import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPost = asyncHandler(async (req, res) => {
    const owner = req.user;
    const { title, content, media, typeofPost } = req.body;

    if (!title || !title.trim() || !content || !content.trim()) {
        throw new ApiError(400, "Post must have a title and content");
    }

    const post = await Post.create({
        owner,
        title,
        content,
        media,
        typeofPost
    });

    if (!post) {
        throw new ApiError(500, "An error occurred while creating the post.");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, post, "Post Created Successfully"));
});

const getUserPosts = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!userId || !userId.trim() || !isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid User ID");
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const options = {
        page: page,
        limit: limit,
        sort: { createdAt: -1 }
    };

    try {
        const aggregationPipeline = [
            {
                $match: {
                    owner: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $sort: options.sort
            }
        ];

        const result = await Post.aggregatePaginate(
            Post.aggregate(aggregationPipeline),
            options
        );

        return res
            .status(200)
            .json(new ApiResponse(200, result, "Posts Fetched Successfully"));
    } catch (error) {
        throw new ApiError(500, "Server Error");
    }
});

const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    if (!isValidObjectId(postId)) {
        throw new ApiError(400, "Invalid Post ID");
    }

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
        throw new ApiError(500, "Unable to delete post");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, deletedPost, "Post Deleted Successfully"));
});

export {
    createPost,
    getUserPosts,
    deletePost
};
