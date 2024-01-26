import { Request, Response } from 'express'
import User from '../models/User'
import Token from '../models/token'
import Auth from '../middleware/Auth'
import dataResponse from '../lib/dataResponse'
import tokenController from './tokenController'

class authController {
  async login(req: Request, res: Response) {
    let email = req.body.email
    const user = await User.findOne({ email: email })
    if (user) {
      if (user.schema.methods.isVerified()) {
        let password: string = req.body.password
        let hashedPassword = user.password
        if (user.schema.methods.checkPassword(password, hashedPassword)) {
          user.schema.methods.generateToken(res)
          res.json(dataResponse({ userId: user.id }, 200, 'Login sucess'))
        } else {
          res.json(dataResponse('', 200, 'Invalid email or password'))
        }
      } else {
        const tokenItem = await Token.findOne({ userId: user.id })
        if (tokenItem) {
          if (tokenItem.schema.methods.isNotExpired) {
            await Token.deleteMany().where({ userId: user._id })
            await tokenController.create({ userId: user._id, email: email })
            res.json(
            dataResponse(null, 200, 'Your\'e account is not verified,a new token has been sent to your email')
          )
          } else {
            await Token.deleteMany().where({ userId: user.id })
            await User.deleteMany().where({ _id: user.id })
            res.json(
              dataResponse(
                '',
                200,
                "Your account doesn't exist, please sign up "
              )
            )
          }
        } else{
            await tokenController.create({ userId: user._id, email: email })
            res.json(
                dataResponse(null, 200, 'Your\'e account is not verified,a new token has been sent to your email')
            )
        }
      }
    } else{
        res.json(dataResponse('', 200, 'This account doesn\'t exist, please sign up'))
    }
  }

  async checkToken(req: Request, res: Response) {
    let token: any = req.headers.authorization
    let user = await Auth.check(token)
    if (user) {
      res.json(dataResponse({ isLogin: true, user: user }, 200, ''))
    } else {
      res.json(dataResponse({ isLogin: false }, 200, ''))
    }
  }
}

export default authController
