import { Response } from 'express'
import { Schema, model } from 'mongoose'
import isEmail from 'validator/lib/isEmail'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

interface userModalInterface {
  username: string
  email: string
  password: string
  isAdmin: boolean
}

const userSchema = new Schema<userModalInterface>({
  username: { type: String, required: [true, 'Username is required'] },
  email: { type: String, required: [true, 'Enter your email'], unique: true, validate:[isEmail, 'Please Enter a valid email'] },
  password: { type: String, required: [true, 'Enter your password'] },
  isAdmin: { type: Boolean, required: true, default: false },
})

userSchema.pre('save', async function (next){
  const salt = await bcrypt.genSalt(10)
  this.password =bcrypt.hashSync(this.password, salt)
  next() 
})

userSchema.methods.checkPassword = function(password:string, hashedPassword:string){
  return bcrypt.compareSync(password,hashedPassword);
}

userSchema.methods.generateToken = function (res:Response){
  const jwts:any = process.env.JWT_SECRET
   let token = jwt.sign({id: this._id}, jwts, {expiresIn: '30d'})
   res.cookie('jwt',token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 17 * 24 * 60 * 60 * 1000
   })
}

export default model<userModalInterface>('User', userSchema)
