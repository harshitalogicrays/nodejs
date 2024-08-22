import express from 'express'
import 'dotenv/config'
const server=express()
server.use(express.json())


server.get('/',(req,res,next)=>{
    console.log("middleware called")
    // throw new Error("something went wrong")
    next()},(req,res)=>res.send("hello from server"))

const fun1 =(req,res,next)=>{
    console.log("fun1 called")
    next()
}
const fun2 =(req,res,next)=>{
    console.log("fun2 called")
    next()
}
const fun3 =(req,res,next)=>{
    console.log("fun3 called")
}
server.get('/middlewaredemo',[fun1,fun2,fun3])

let port =  process.env.PORT 
server.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
})