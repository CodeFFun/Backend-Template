import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'
import router from './router'
import cors from 'cors'
import connect from './config/db'
import cookiesParser from 'cookie-parser'

dotenv.config()
const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ origin: true, credentials: true }))
app.use(cookiesParser())

connect
app.use(router)

app.use('/', (req: Request, res: Response) => {
  res.send('Welcome to the write app')
})

const port: string | number | null = process.env.PORT || 8000
const server: string | number | null = process.env.HOST || 'localhost'

app.listen(port, () => {
  console.log(`Server is running on port http://${server}:${port}`)
})
