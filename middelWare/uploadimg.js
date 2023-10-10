import express from 'express'
const router = express.Router()
import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });

router.post("/", upload.single("file"), (req, res) => {
  console.log(req.body.name)
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});


// import { v2 as cloudinary } from 'cloudinary'
// import dotenv from "dotenv"
// dotenv.config()

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.SECRET_KEY,
// });

// router.post('/', async (req, res) => {
// console.log(req.body)
//   try {
//     const result = await cloudinary.uploader.upload(req.body.name, {
//       transformation: [{ width: 500, height: 500, crop: 'limit' }],
//     });
//     res.json({ url: result.secure_url });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


export default router