import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import Token from '../models/token'
import User from '../models/User'
import dataResponse from '../lib/dataResponse'
import sendEmail from '../lib/sendEmail'

class tokenController {
  static async create({ userId, email }: { userId: any; email: string }) {
    try {
      const tempToken = Math.floor(100000 + Math.random() * 900000)
      const tokenObject = {
        userId: new mongoose.Types.ObjectId(userId),
        token: await bcrypt.hash(tempToken.toString(), 10),
        createdAt: new Date(),
        expiresAt: new Date(new Date().getTime() + 60 * 60 * 1000),
      }
      let tokenData = new Token(tokenObject)
      await tokenData.save()
      await sendEmail({ email: email, tempToken })
    } catch (err) {
      console.log(err)
    }
  }

  async verify(req: Request, res: Response) {
    let id = req.body.userId
    const tokenItem = await Token.findOne().where({ userId: id })
    try {
      if (tokenItem) {
        let token = req.body.token
        let hashedToken = tokenItem.token
        if (tokenItem.schema.methods.isNotExpired) {
          if (
            tokenItem.schema.methods.checkToken(token.toString(), hashedToken)
          ) {
            await Token.deleteMany().where({ userId: id })
            await User.findByIdAndUpdate({ _id: id }, { verified: true })
            res.json(dataResponse(null, 200, 'Your account has been verified'))
          } else {
            throw new Error('Token is invalid')
          }
        } else {
          throw new Error('Token is already expired')
        }
      } else {
        throw new Error(
          'Your account may already be verified try logging in or try signing up again '
        )
      }
    } catch (err) {
      res.json(dataResponse(err, 400, 'Token validation error'))
    }
  }

  async resend(req: Request, res: Response) {
    let id = req.body.userId
    let email = req.body.email
    const tokenItem = await Token.findOne().where({ userId: id })
    try {
      if (tokenItem) {
        if (tokenItem.schema.methods.isNotExpired) {
          await Token.deleteMany().where({ userId: id })
          await tokenController.create({ userId: id, email: email })
          res.json(
            dataResponse(null, 200, 'A new token has been sent to your email')
          )
        } else {
          let user = await User.findOne({_id: id})
          await Token.deleteMany().where({ userId: user?.id })
          await User.deleteMany().where({ _id: user?.id })
          throw new Error('Token is already expired, please sign up again')
        }
      } else {
        throw new Error(
          'Your account may already be verified or doesn\'t exist, try logging in or  signing up again '
        )
      }
    } catch (err) {
      res.json(dataResponse(err, 400, 'Token validation error'))
    }
  }
}

export default tokenController
