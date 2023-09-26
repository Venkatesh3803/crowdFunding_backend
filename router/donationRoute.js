import express from "express"
import { donations } from "../controllers/donationController.js"
import { verifyUser } from "../middelWare/VerifyJwt.js"

const route = express.Router()

route.post("/:id", verifyUser, donations)


export default route