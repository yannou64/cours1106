import {TokenBlackList} from "../models/TokenBlackList.js"
import jwt from "jsonwebtoken"

export const verifyToken = async(req, res, next)=>{
    try {
        const tokenReceived = req.cookies.token
        if(!tokenReceived) return res.status(401).json({message: "token missing"})

        const listTokenBlackList = await TokenBlackList.findOne({token})
        if(listTokenBlackList) return res.status(401).json({message: "Token has been revoked"})

        const decoded = jwt.verify(tokenReceived, process.env.SECRET)
        req.user = decoded
        next()
    } catch (e) {
        res.status(400).json({error: `Error de token : ${e.message}`})
    }
}