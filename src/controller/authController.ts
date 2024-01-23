import {Request, Response} from 'express'
import User from "../models/User";
import Token from '../models/token';
import Auth from "../middleware/Auth";
import dataResponse from '../lib/dataResponse';

class authController{
    async login(req:Request, res:Response){
        let email = req.body.email
        const user = await User.findOne({email: email})
        if(user){
            if(user.schema.methods.isVerified()){
                let password:string = req.body.password;
                let hashedPassword = user.password
                if(user.schema.methods.checkPassword(password, hashedPassword)){
                    user.schema.methods.generateToken(res)
                    res.json(dataResponse({userId: user.id}, 200, 'Login sucess'))
                } else{
                    res.json(dataResponse('', 200, 'Invalid email or password'))
                }
            } else {
                let token = Token.find().where({userId: user.id})
                await token.deleteMany()
                await user.deleteOne()
            }
        }
    }

    async checkToken(req:Request, res:Response){
        let token:any = req.headers.authorization
        let user = await Auth.check(token)
        if(user){
            res.json(dataResponse({isLogin:true, user:user}, 200, ''))
        } else{
            res.json(dataResponse({isLogin:false}, 200, ''))
        }
    }
}

export default authController