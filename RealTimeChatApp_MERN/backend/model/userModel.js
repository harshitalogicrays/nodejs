import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    profilepic:{type:String,default:"https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png"},
    isAdmin:{ type:Boolean,required:true,default:false  }
},
{timestamps:true}
)

userSchema.pre("save",async function(next){
    if(!this.isModified){
        next()
    }
    const salt = await bcrypt.genSalt(15)
    this.password = await bcrypt.hash(this.password,salt)
})

userSchema.methods.matchPassword = (async function(eneteredPassword){
    return await bcrypt.compare(eneteredPassword,this.password)
})

const User = mongoose.model("User",userSchema)
export default User