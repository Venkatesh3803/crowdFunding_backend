import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    goal: {
        type: Number,
        required: true,
    },
    fundlingList: {
        type: Array,
    },
    risedAmount: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    numberOfDays: {
        type: Number,
        required: true
    },


}, { timestamps: true })


export default mongoose.model("projects", ProjectSchema)
