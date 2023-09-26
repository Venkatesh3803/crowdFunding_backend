import express from "express"
import { createProject, deleteProject, getAllProjects, getProjectInfo, updateProject } from "../controllers/projectController.js";
import { verifyJwt, verifyUser } from "../middelWare/VerifyJwt.js";
const route = express.Router();

route.post("/", verifyJwt, createProject)
route.get("/", getAllProjects)
route.get("/single/:id", getProjectInfo)
route.patch("/:id", updateProject)
route.delete("/:id", verifyUser, deleteProject)

export default route