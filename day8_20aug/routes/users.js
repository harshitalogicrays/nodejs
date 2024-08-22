//routes 
import express from 'express'
const router=express.Router()

//http://localhost:3000/users
router.get('/',(req,res)=>{res.send("users get route")})
//http://localhost:3000/users/:id
router.get('/:id',(req,res)=>{res.send(req.params)})
router.post('/',(req,res)=>{res.send("users post route")})
router.put('/:id',(req,res)=>{res.send("users put route")})
router.delete('/:id',(req,res)=>{res.send("users delete route")})


export default router