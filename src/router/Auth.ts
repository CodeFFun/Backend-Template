import { Router } from "express";
import authController from "../controller/authController";


const authRouter = Router()
const authInstance = new authController()

authRouter.get('/valid-token', authInstance.checkToken)
authRouter.post('/', authInstance.login)

export default authRouter
