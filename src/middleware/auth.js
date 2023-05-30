import jwt from "jsonwebtoken";
import userModel from '../../DB/model/User.model.js'
import {verifyToken} from '../utils/GenerateAndVerifyToken.js'

export const auth = () => {
    return async (req, res, next) => {
        try {
            const { token } = req.headers
            if (!token || !token.startsWith("mrwan__")) {
                res.json({ message: "please enter valid token" })
            } else {
                const newtoken = token.split("mrwan__")[1]
                const decoded = verifyToken({token:newtoken})
                const user = await userModel.findById(decoded.user._id)
                if (!user) {
                    res.json({ message: "token error" })
                } else {
                    req.user = user
                    next()
                }
            }
        } catch (error) {
            res.json({ message: "token catch" })
            console.log(error);
        }
    }
}
