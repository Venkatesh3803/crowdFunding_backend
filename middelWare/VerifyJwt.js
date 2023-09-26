import jwt from "jsonwebtoken"

export const verifyJwt = async (req, res, next) => {
    const authHeader = req.headers.token
    if (!authHeader) return res.status(404).send("You are not Authanticated")
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.JWT_KEY, (error, user) => {
        if (error) return res.send(error)
        req.user = user;
        next()
    })
}

export const verifyUser = async (req, res, next) => {
    verifyJwt(req, res, () => {
        if (req.user.id === req.body.userId || req.user.id) {
            next()
        } else {
            return res.sendStatus(401)
        }
    })
}