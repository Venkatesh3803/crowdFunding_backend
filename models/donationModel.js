import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
    projectId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    risedAmount: {
        type: Number,
        required: true,
    },


}, { timestamps: true })


export default mongoose.model("donations", donationSchema)
