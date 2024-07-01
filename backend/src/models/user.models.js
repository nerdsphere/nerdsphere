import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"username is required"],
        unique: [true, "username with this address already exists, please login"],
        lowercase: true,
        trim: true,
        index: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email with this address already exists, please login"],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true,"password is required"]

    },
    avatar: {
        type: String,
        required: [true,"avatar is required"],
    },
    coverImage: {
        type: String,

    },
    bio: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

export const User = mongoose.model("User", userSchema)
