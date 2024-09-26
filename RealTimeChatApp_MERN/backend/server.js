import express from 'express'
import 'dotenv/config'
import connectDB from './config/db.js'
import userRouter from './routes/user.js'
import chatRouter from './routes/chat.js'
import cors from 'cors'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

const app = express()
connectDB(process.env.DB_URL)
app.use(express.json())
app.use(cors())
app.use(notFound)
app.use(errorHandler)
app.use('/',userRouter)
app.use('/chat',chatRouter)



let port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
})