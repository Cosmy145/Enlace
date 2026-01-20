import mongoose, { Schema } from "mongoose";

const OTPSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
})

export default mongoose.model("OTP", OTPSchema);