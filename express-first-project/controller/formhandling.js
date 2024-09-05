import Form from "../model/formModel.js";

let displayform = (req,res)=>{
    res.render('getform');
} 
let fetchformdata=(req,res)=>{
    // res.send(req.query)
    let {email,password}=req.query
    res.render("formdata",{email,password})
}

let displaypostform = (req,res)=>{
    res.render('postform');
} 
let fetchpostformdata=async(req,res)=>{
    // res.send(req.query)
    let {email,password}=req.body
    // res.render("formdata",{email,password})
    try{
        // const f1 =  new Form({email:email,password:password})
        // await f1.save()

        await Form.create({email:email,password:password})
        res.status(200).send({
            status:'success',
            message:"user added successfully"
        })
    }
    catch(err){
        res.status(400).send({
            status:'fail',
            message:err.message
        })
    }
   
}

export {displayform,fetchformdata,displaypostform,fetchpostformdata}