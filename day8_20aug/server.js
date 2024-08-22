import express from 'express'
import 'dotenv/config'
const server=express()
server.use(express.json())
//REST API - get (http://localhost:3000)
// server.get('/',(req,res)=>{
//     res.send("hello from expressjs")
// })
//get (http://localhost:3000)
// server.post('/',(req,res)=>{
//     res.send("post request")
// })
// server.get('/customer/data',(req,res)=>{
//     res.status(200)
//     res.setHeader('content-type','application/json')
//     // res.send({'msg':'json data'})
//     res.json({'msg':'json data s'})
// })

// server.get('/customer',(req,res)=>{
//     res.status(200)
//     res.setHeader('content-type','text/html')
//     res.send("customer route called")
// })

// server.get('/product/:id/:name',(req,res)=>{
//     res.send(req.params)
// })

// server.get('/product/list?',(req,res)=>{
//     res.send(req.query)
// })

// server.get('/product/list/route',(req,res)=>{
//     res.send(req.route)
// })

server.get('/method',(req,res)=>{
    res.send(req.method)
})

server.get('/product/:id([0-9]{3,3})/:name([a-z]+)',(req,res)=>{
    res.send(req.params)
})




let port =  process.env.PORT 
server.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
})