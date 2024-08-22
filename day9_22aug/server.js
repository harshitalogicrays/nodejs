import express from 'express'
import 'dotenv/config'
import user from './routes/user.js'
const app=express()

app.use(express.json())
//http://localhost:3000/user
app.use('/user',user)


let port  = process.env.PORT || 1000
app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
})
