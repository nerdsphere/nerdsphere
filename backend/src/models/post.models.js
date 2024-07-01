import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    content: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    media: {
        type: String,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    views: {
        type: Number,
        default: 0
    },
    typeofPost: {
        type: String,
        enum: {
            values: ['post', 'wip', 'question'],
            message: '{VALUE} is not supported'
        }
    }

    
}, {timestamps: true})

postSchema.plugin(mongooseAggregatePaginate)

export const Post = mongoose.model("Post", postSchema)

