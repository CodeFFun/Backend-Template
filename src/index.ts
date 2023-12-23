import express, {Application, Request, Response} from 'express'
import dotenv from 'dotenv'

dotenv.config()
const app:Application = express()

const port:string | number | null  = process.env.PORT || 8080
const server: string | number | null = process.env.HOST || 'localhost' 

app.listen(port, () => {
    console.log(`Server is running on port http://${server}:${port}`)
})