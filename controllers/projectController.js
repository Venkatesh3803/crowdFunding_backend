
import projectModel from "../models/projectModel.js";

export const createProject = async (req, res) => {
    const newProject = await projectModel(req.body)
    try {
        const project = await newProject.save()
        res.status(201).json(project)
    } catch (error) {
        res.status(500).send(error.message)
    }
}


export const updateProject = async (req, res) => {
    try {
        const currProject = await projectModel.findById(req.params.id)
        if (!currProject) return res.status(401).send("you are not allowed update");
        await projectModel.findOneAndUpdate(currProject, req.body)
        res.status(201).send("Updated")
    } catch (error) {
        res.status(500).send(error.message)
    }
}


export const getProjectInfo = async (req, res) => {
    try {
        const currUser = await projectModel.findById(req.params.id)
        if (!currUser) return res.status(401).send("projects not avaliable");
        res.status(201).json(currUser)
    } catch (error) {
        res.status(500).send(error.message)
    }
}


export const deleteProject = async (req, res) => {
    try {
        const currProject = await projectModel.findById(req.params.id)
        if (!currProject) return res.status(401);
        await projectModel.findOneAndDelete(currProject)
        res.status(200).send("Deleted")
    } catch (error) {
        res.status(500).send(error.message)
    }
}
export const getAllProjects = async (req, res) => {
    const userId = req.query.userid
    const cat = req.query.cat
    const search = req.query.search

    try {
        let project;
        if (userId) {
            project = await projectModel.find({ userId: userId })
        } else if (cat) {
            project = await projectModel.find({ category: cat })
        } else if (search) {
            project = await projectModel.find({ title: { $regex: search, $options: 'i' } })
        } else {
            project = await projectModel.find()
        }
        res.status(201).send(project)
    } catch (error) {
        res.status(500).send(error.message)
    }
}



