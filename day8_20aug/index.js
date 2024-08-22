import express from 'express'
import 'dotenv/config'
import users from './routes/users.js'
import products from './routes/product.js'
const app=express()
app.use(express.json())

//http://localhost:3000/users
app.use('/users',users)
app.use('/',products)

let port =  process.env.PORT 
app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
})