import { registerUser, loginUser, logout } from "../controllers/authController.js";
import express from "express"
import {verifyToken} from "../middlewares/verifyToken.js"

export const authRouter = express.Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.post('/logout', logout)