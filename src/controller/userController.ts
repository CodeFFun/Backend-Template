import {Request, Response} from 'express'
import User from '../models/User';
import dataResponse from '../lib/dataResponse';

interface userControllerInterface{
    index(req:Request, res:Response):void;
    create(req:Request, res:Response):void;
    show(req:Request, res:Response):void;
    update(req:Request, res:Response):void;
    delete(req:Request, res:Response):void;
}

class userController implements userControllerInterface{
    async index(req:Request, res:Response){
        const user = await User.find({})
        res.json(dataResponse(user, 200, "Users List"))
    }
    async create(req:Request, res:Response){
        try {
            let user = new User(req.body)
            await user.save()
            res.json(dataResponse(user, 200, 'User Created'))
        } catch (err) {
            res.json(dataResponse(err, 400, `Something went wrong ${err}`))
        }
    }
    async show(req:Request, res:Response) {
        let id = req.params.id;
        try{
          let findData =await User.findById(id)
           res.json(dataResponse(findData, 200, ''));
        }catch(err){
          console.log(err);
        }
      }
    async update(req:Request, res:Response){
       let id = req.params.id
       try {
            const user = await User.findById(id)
            await user?.updateOne(req.body)
            return res.json(dataResponse(user, 200, 'Profile Updated'))
       } catch (error) {
            res.json(dataResponse(error, 200, 'Something went wrong'))
       }
    }
    async delete(req:Request, res:Response){
        let id = req.params.id
        try {
             const user = await User.findById(id)
             await user?.deleteOne(req.body)
             return res.json(dataResponse(user, 200, 'Profile Deleted'))
        } catch (err) {
             res.json(dataResponse(err, 200, 'Something went wrong'))
        }
    }
}



export default  userController