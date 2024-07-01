import mongoose from "mongoose";

const dislikeSchema = new mongoose.Schema({
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
    dislikedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

}, {timestamps: true})

export const Dislike = mongoose.model("Dislike", dislikeSchema)

