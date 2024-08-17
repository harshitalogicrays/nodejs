import express from 'express'
const app =express()
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("hello from server")
})
app.listen(2000,()=>{})