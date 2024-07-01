import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const replySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        index: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    posts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    resources: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resource",
    },
    views: {
        type: Number,
        default: 0
    }



}, {timestamps: true})
replySchema.plugin(mongooseAggregatePaginate)

export const Reply = mongoose.model("Reply", replySchema)
