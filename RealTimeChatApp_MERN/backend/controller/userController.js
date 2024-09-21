import asyncHandler from "express-async-handler"
import User from "../model/userModel.js"

export let registerUser=asyncHandler(async(req,res)=>{
 let {email,password,name} = req.body
 if(!name || !email || !password){
    res.status(400).send("Please enter all the fields")
 }

 const userExists = await User.findOne({email})
 if(userExists){
    res.status(400).send("User already exists")
    // throw new Error("User already exists")
 }
 else{
    const user= await User.create({name,email,password})
    if(user){
        res.status(201).json({
            _id:user._id,name:user.name,email:user.email,password:user.password,profilepic:user.profilepic
        })
    }
    else { res.status(400)
        throw new Error("Failed to create user")}
 }

})

export let authUser=asyncHandler(async(req,res)=>{
    const{email,password}=req.body
    const user = await User.findOne({email}) 
    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,name:user.name,email:user.email,password:user.password,profilepic:user.profilepic,
            isAdmin:user.isAdmin
        })
    }
    else res.status(400).json({"status":400,"message":"Invalid Credentials"})
})