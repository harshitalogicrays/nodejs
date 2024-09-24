import jwt from 'jsonwebtoken'
import "dotenv/config"
const generateToken = (id)=>{
   return jwt.sign({id},process.env.JWT_SECRET_KEY,{expiresIn:"2d"})
}

export default generateToken