import express from 'express'
import User from './User'

const router = express.Router()

router.use('/user', User)

export default router