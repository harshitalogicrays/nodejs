import mongoose, { Schema } from  "mongoose"

const formSchema = new Schema({
    email:{ type: String,
            required: [true,"email is required"],
            unique: true
},
    password:String
})

const Form = mongoose.model("formdata",formSchema)

export default Form
//formdatas collection name