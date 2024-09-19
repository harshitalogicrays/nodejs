import mongoose, { Schema } from  "mongoose"

const formSchema = new Schema({
    email:{ type: String,
            required: [true,"email is required"],
            unique: true
},
    password:{type:String}
})

// formSchema.index({ email: 1 }, { unique: true });

const Form = mongoose.model("formdata", formSchema);
// Form.init()  // This ensures indexes are created
//   .then(() => console.log("Indexes created successfully"))
//   .catch(err => console.error("Error creating indexes", err))

export default Form
//formdatas collection name


 // password:{type:String,select:false}