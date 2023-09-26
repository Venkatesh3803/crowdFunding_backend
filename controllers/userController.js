import userModel from "../models/userModel.js"


export const updateUser = async (req, res) => {
    try {
        const currUser = await userModel.findById(req.user.id)
        if (!currUser) return res.status(401).send("you are not allowed update");
        await userModel.findOneAndUpdate(currUser, req.body)
        res.status(201).send("Updated ")
    } catch (error) {
        res.status(500).send(error.message)
    }
}


export const getUserInfo = async (req, res) => {
    try {
        const currUser = await userModel.findById(req.params.id)
        if (!currUser) return res.status(401).send("Unathorize");
        res.status(201).json(currUser)
    } catch (error) {
        res.status(500).send(error.message)
    }
}


export const deleteUser = async (req, res) => {
    try {
        const currUser = await userModel.findById(req.user.id)
        if (!currUser) return res.statusCode(401);
        await userModel.findOneAndDelete(currUser)
        res.status(201).send("Deleted")
    } catch (error) {
        res.status(500).send(error.message)
    }
}
export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find()

        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error.message)
    }
}