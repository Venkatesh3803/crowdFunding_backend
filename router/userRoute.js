import express from "express"
import { deleteUser, getAllUsers, getUserInfo, updateUser } from "../controllers/userController.js"
import { verifyJwt } from "../middelWare/VerifyJwt.js"
const route = express.Router()

route.patch("/", verifyJwt, updateUser)
route.get("/single/:id", getUserInfo)
route.delete("/", verifyJwt, deleteUser)
route.get("/", getAllUsers)


export default route