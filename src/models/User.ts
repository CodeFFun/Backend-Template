import {Schema, model} from "mongoose"


interface userModalInterface {
    name:string,
    email:string,
    password:string,
    isAdmin:boolean,
}


const userSchema = new Schema<userModalInterface>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true, default: false},
})

export default model<userModalInterface>("User", userSchema)