import express from 'express'
import userController from '../controller/userController'


const User = express.Router()
const userInstance = new userController

User.get('/', userInstance.index)
User.get('/:id', userInstance.show)
User.put('/:id', userInstance.update)
User.delete('/:id', userInstance.delete)

export default User