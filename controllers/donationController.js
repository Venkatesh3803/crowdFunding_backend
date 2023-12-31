import donationModel from "../models/donationModel.js";
import projectModel from "../models/projectModel.js";
import userModel from "../models/userModel.js";


export const donations = async (req, res) => {
    const newDonation = await donationModel(req.body)
    try {
        const currProj = await projectModel.findById(req.params.id)
        const { risedAmount } = req.body;

        let amount = currProj.risedAmount + risedAmount;
        if (!currProj) return res.sendStatus(401)

        let currUser = await userModel.findById(req.body.userId)
        let userAmount = currUser.balance - risedAmount

        await currUser.updateOne({ balance: userAmount })
        await currProj.updateOne({ risedAmount: amount })
        let donation = await newDonation.save()

        res.status(201).json(donation)
    } catch (error) {
        res.status(500).send(error.message)
    }
}


export const getDonations = async (req, res) => {
    const userId = req.query.userid;
    const proj = req.query.projectid;
    try {
        let donation;
        if (userId) {
            donation = await donationModel.find({ userId: userId }).sort({ createdAt: -1 })
        } else {
            donation = await donationModel.find({ projectId: proj }).sort({ createdAt: -1 })
        }
        res.status(201).json(donation)
    } catch (error) {
        res.status(500).json(error.message)
    }
}