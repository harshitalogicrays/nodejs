import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    profilepic:{type:String,default:"https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png"}
},
{timestamp:true}
)

const User = mongoose.model("User",userSchema)
export default User