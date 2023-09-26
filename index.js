import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors"
import AuthRoute from "./router/authRoute.js"
import UserRoute from "./router/userRoute.js"
import ProjectRoute from "./router/projectRoute.js"
import DonationRoute from "./router/donationRoute.js"
import Uploadimg from "./middelWare/uploadimg.js"


// configrations
const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())
const PORT = 5500;


// to serve images inside public folder
app.use(express.static('public'));
app.use('/images', express.static('images'));

const connect = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => console.log("connected to mongo"))
}

app.listen(PORT, () => {
    connect()
    console.log(`app is listening at ${PORT}`)
})


app.get("/", (req, res) => {
    res.send("Wellcome TO Crowdfunding backend")
})
//routes
app.use("/api/auth", AuthRoute)
app.use("/api/user", UserRoute)
app.use("/api/project", ProjectRoute)
app.use("/api/donation", DonationRoute)
app.use('/api/upload', Uploadimg)
