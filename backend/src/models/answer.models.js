import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const answerSchema = new mongoose.Schema({
    answeredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    questions: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    isAccepted: {
        type: Boolean,
        default: false
    },
    isRemoved: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

answerSchema.plugin(mongooseAggregatePaginate)

export const Answer = mongoose.model("Answer", answerSchema)
