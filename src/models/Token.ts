import mongoose,{Schema, model} from "mongoose"
import User from "./User"
import bcrypt from 'bcrypt'


interface Token{
    userId:mongoose.Schema.Types.ObjectId,
    token:string,
    createdAt:Date,
    expiresAt:Date,
}

const tokenSchema = new Schema<Token>({
    userId: {type: mongoose.Schema.Types.ObjectId,ref:User, required: true},
    token: {type: String, required: true},
    createdAt: {type: Date, required: true},
    expiresAt: {type: Date, required: true}
})

tokenSchema.methods.checkToken = function(token:string, hashedToken:string){
    return bcrypt.compareSync(token, hashedToken);
}

tokenSchema.methods.isExpired = function(){
    const isNotExpired = new Date().getTime() < this.expiresAt.getTime() ? true : false
    return isNotExpired
}

export default model<Token>('Token', tokenSchema)