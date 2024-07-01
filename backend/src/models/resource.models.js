import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    requestedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, {timestamps: true})
resourceSchema.plugin(mongooseAggregatePaginate)

export const Resource = mongoose.model("Resource", resourceSchema)
