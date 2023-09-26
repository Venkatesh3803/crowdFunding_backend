import donationModel from "../models/donationModel.js";
import projectModel from "../models/projectModel.js";


export const donations = async (req, res) => {
    const newDonation = await donationModel(req.body)
    try {
        const currProj = await projectModel.findById(req.params.id)
        const { risedAmount } = req.body;
        let amount = currProj.risedAmount + risedAmount;
        if (!currProj) return res.sendStatus(401)
        await currProj.updateOne({ risedAmount: amount })
        await newDonation.save()
        res.status(201).json("Donated Sucessfully")
    } catch (error) {
        res.status(500).send(error.message)
    }
}