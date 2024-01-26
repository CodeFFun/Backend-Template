import express from 'express'
import User from './User'
import Auth from './Auth'

const router = express.Router()

router.use('/user', User)
router.use('/auth', Auth)

export default router
