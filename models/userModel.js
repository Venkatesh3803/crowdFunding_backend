import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    balance: {
        type: String,
        default: 5000
    },
    image: {
        type: String
    }

}, { timestamps: true })


export default mongoose.model("user", UserSchema)
