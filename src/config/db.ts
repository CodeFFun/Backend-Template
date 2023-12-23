import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const dburl: string | number | null = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/writeApp'
const connect = mongoose.connect(dburl).then(() =>{
    console.log('Database Connected')
}).catch((error) =>{
    console.log(error)
})

export default connect