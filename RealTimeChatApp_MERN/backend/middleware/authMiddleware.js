import expressAsyncHandler from "express-async-handler"
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import User from "../model/userModel"

const authorized  =  expressAsyncHandler(async(req,res,next)=>{
    let token =''
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token =  req.headers.authorization.split("")[1]

            //decode token 
            const decode = jwt.verify(token,process.env.JWT_SECRET_KEY) 
            req.user =  await User.findById(decode).select("-password")
            next()
        }
        catch(error){
            res.status(401)
            throw new Error("Not Authorized User")
        }
    }
    if(!token){  res.status(401)
        throw new Error("Not Authorized User")}
})
export default authorized