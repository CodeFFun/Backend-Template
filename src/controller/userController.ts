import { Request, Response } from 'express'
import User from '../models/User'
import dataResponse from '../lib/dataResponse'
import errorResponse from '../lib/errorResponse'
import tokenController from './tokenController'

interface userControllerInterface {
  index(req: Request, res: Response): void
  create(req: Request, res: Response): void
}

class userController implements userControllerInterface {
  async index(req: Request, res: Response) {
    const user = await User.find({})
    res.json(dataResponse(user, 200, 'Users List'))
  }
  async create(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body
      let user = new User({ username, email, password, verified: false })
      await user.save()
      await tokenController.create({ userId: user._id, email: user.email })
      res.json(
        dataResponse({ id: user._id, email }, 200, 'Pending Verification')
      )
    } catch (err) {
      const error = errorResponse(err)
      res.json(dataResponse(error, 400, 'User validation error'))
    }
  }
}


export default userController
