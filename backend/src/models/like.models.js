import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    posts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    replies: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reply",
    },
    answers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
    },
    likedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

}, {timestamps: true})

export const Like = mongoose.model("Like", likeSchema)

