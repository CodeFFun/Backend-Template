import express from 'express'
import userController from '../controller/userController'

const User = express.Router()
const userInstance = new userController()

User.get('/', userInstance.index)

export default User
