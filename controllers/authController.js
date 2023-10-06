import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt)
    req.body.password = hashPass
    const newUser = userModel(req.body)
    try {
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {

        res.status(500).json(error.message)
    }
}


export const login = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (!user) return res.status(404).send("User Doesnot exist")

        const verifyPass = await bcrypt.compareSync(req.body.password, user.password)
        if (!verifyPass) return res.status(401).send("Invalid credentials")

        const token = jwt.sign({
            id: user._id, email: user.email,
        }, process.env.JWT_KEY, { expiresIn: "24h" })

        const { password, ...userInfo } = user._doc;
        res.status(201).json({ ...userInfo, token })
    } catch (error) {
        res.status(500).json(error.message)
    }
}