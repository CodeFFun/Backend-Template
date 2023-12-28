import { Schema, model } from 'mongoose'
import isEmail from 'validator/lib/isEmail'
import bcrypt from 'bcrypt'

interface userModalInterface {
  userName: string
  email: string
  password: string
  isAdmin: boolean
}

const userSchema = new Schema<userModalInterface>({
  userName: { type: String, required: [true, 'Username is required'] },
  email: { type: String, required: [true, 'Enter your email'], unique: true, validate:[isEmail, 'Please Enter a valid email'] },
  password: { type: String, required: [true, 'Enter your password'] },
  isAdmin: { type: Boolean, required: true, default: false },
})

userSchema.pre('save', async function (next){
  const salt = await bcrypt.genSalt()
  this.password =bcrypt.hashSync(this.password, 10)
  next() 
})

export default model<userModalInterface>('User', userSchema)
