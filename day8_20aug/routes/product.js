//routes 
import express from 'express'
import { getproductbyid, getproducts } from '../controllers/product.js'
const router=express.Router()

//http://localhost:3000/
router.get('/',getproducts)
//http://localhost:3000/:id
router.get('/:id',getproductbyid)

router.post('/',(req,res)=>{res.send("products post route")})
router.put('/:id',(req,res)=>{res.send("products put route")})
router.delete('/:id',(req,res)=>{res.send("products delete route")})


export default router