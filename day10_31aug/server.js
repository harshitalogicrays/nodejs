import express from 'express'
import 'dotenv/config'
import user from './routes/user.js'

const app=express()

app.use(express.json())

//http://localhost:3000/user
app.use('/user',user)

app.all("*",(req,res,next)=>{
    // res.status(404).json({status:'fail',message:'something went wrong'})
    const err = new Error("bad request")
    err.status = "fail"
    next(err)
})
app.use((error,req,res,next)=>{
    error.statusCode = error.statusCode || 404 
    res.status(error.statusCode).json({status:error.status,message:error.message})
})

let port  = process.env.PORT || 1000
app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
})
