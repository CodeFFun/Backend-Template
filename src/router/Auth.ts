import { Router } from 'express'
import authController from '../controller/authController'
import userController from '../controller/userController'
import tokenController from '../controller/tokenController'

const authRouter = Router()
const authInstance = new authController()
const userInstance = new userController()
const tokenInstance = new tokenController()

authRouter.get('/valid-token', authInstance.checkToken)
authRouter.post('/login', authInstance.login)
authRouter.post('/register', userInstance.create)
authRouter.post('/verify-token', tokenInstance.verify)
authRouter.post('/resend-token', tokenInstance.resend)
authRouter.post('/forgot-password', authInstance.forgotPassword)
authRouter.post('/logout', authInstance.logout)

export default authRouter
