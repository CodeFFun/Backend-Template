import { Request, Response } from 'express'
import User from '../models/User'
import dataResponse from '../lib/dataResponse'
import errorResponse from '../lib/errorResponse'
import sendEmail from '../lib/sendEmail'
import tokenController from './tokenController'

interface userControllerInterface {
  index(req: Request, res: Response): void
  create(req: Request, res: Response): void
  show(req: Request, res: Response): void
  update(req: Request, res: Response): void
  delete(req: Request, res: Response): void
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
  async show(req: Request, res: Response) {
    let id = req.params.id
    try {
      let findData = await User.findById(id)
      res.json(dataResponse(findData, 200, ''))
    } catch (err) {
      //   errorResponse(err)
    }
  }
  async update(req: Request, res: Response) {
    let id = req.params.id
    try {
      const user = await User.findById(id)
      await user?.updateOne(req.body)
      return res.json(dataResponse(user, 200, 'Profile Updated'))
    } catch (error) {
      res.json(dataResponse(error, 500, 'Something went wrong'))
    }
  }
  async delete(req: Request, res: Response) {
    let id = req.params.id
    try {
      const user = await User.findById(id)
      await user?.deleteOne(req.body)
      return res.json(dataResponse(user, 200, 'Profile Deleted'))
    } catch (err) {
      res.json(dataResponse(err, 500, 'Something went wrong'))
    }
  }
}

export default userController
