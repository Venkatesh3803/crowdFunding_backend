import express from "express"
import { donations, getDonations } from "../controllers/donationController.js"
import { verifyUser } from "../middelWare/VerifyJwt.js"

const route = express.Router()

route.post("/:id", verifyUser, donations)
route.get("/list?", getDonations)


export default route