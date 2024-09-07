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
        let res1 =await Form.find()
        res.render('getusers',{title:"Users List",data:res1});
        
        // res.status(200).send({
        //     status:'success',
        //     message:"user added successfully"
        // })
    }
    catch(err){
        res.status(400).send({
            status:'fail',
            message:err.message
        })
        
        // if (err.code === 11000) {
        //     res.status(400).send({
        //       status: "fail",
        //       message: "Email already exists",
        //     });
        //   } else {
            // res.status(400).send({
            //   status: "fail",
            //   message: err.message,
            // });
          // }
    }
   
}

let displayusers=async(req,res)=>{
    console.log("eletuj")
    try{
        let res1 =await Form.find()
        // console.log(res1)
        res.render('getusers',{title:"Users List",data:res1});
    }
    catch(err){
        res.status(400).send({
            status:'fail',
            message:err.message
        })
    }
 
}


let deleteUser=async(req,res)=>{
    let id = req.params.id
    try{
        let res1 =await Form.findByIdAndDelete(id)
        let res2 =await Form.find()
        // console.log(res1)
        res.render('getusers',{title:"Users List",data:res2});
    }
    catch(err){
        res.status(400).send({
            status:'fail',
            message:err.message
        })
    }
}

let editUser=async(req,res)=>{
    let id = req.params.id
    try{
        let res1 =await Form.findById(id)
        // console.log(res1)
        res.render('edituser',{data:res1});
    }
    catch(err){
        res.status(400).send({
            status:'fail',
            message:err.message
        })
    }
}

let updateUser=async(req,res)=>{
    let id = req.params.id
    // console.log(req.body,id)
    try{
        let res1 =await Form.updateOne( { _id : id},{$set:{email:req.body.email,password:req.body.password}})
        let res2 =await Form.find()
        // console.log(res1)
        res.render('getusers',{title:"Users List",data:res2});
    }
    catch(err){
        res.status(400).send({
            status:'fail',
            message:err.message
        })
    }
}
export {displayform,fetchformdata,displaypostform,fetchpostformdata,displayusers,deleteUser,editUser,updateUser}