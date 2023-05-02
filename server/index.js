import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './Routers/UserRouter.js'
import morgan from 'morgan'

const app = express()

app.use(express.json())
app.use(cors())

dotenv.config()

app.use(morgan("short"))

const port = process.env.PORT || 5000

app.use("/users", userRouter)

mongoose.connect(process.env.DATA).then(()=>{
  app.listen(port, ()=>{
    console.log(`App is Running on Port: ${port}`)
  })
}).catch((err)=>{
  console.log("Unable to connect");
})