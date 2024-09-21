import express from 'express'
import 'dotenv/config'
import connectDB from './config/db.js'
import userRouter from './routes/user.js'

const app = express()
connectDB(process.env.DB_URL)
app.use(express.json())
app.use('/',userRouter)



let port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
})