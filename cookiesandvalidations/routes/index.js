import express from 'express';
import { body, validationResult } from 'express-validator';
const router = express.Router();
let formdata ={
  email:'',password:'',name:'',cpassword:''
}

/* GET home page. */
router.get('/', (req, res)=> {
  let data = req.cookies.login
  if(data != undefined){
    let obj = JSON.parse(req.cookies.login)
    res.render('index', { title: 'cookie demo',email:obj.email ,password:obj.password });
  }
  else {
    res.render('index', { title: 'cookie demo' ,email:'' ,password:'' });
  }

});

router.post('/',(req,res)=>{
  // console.log(req.body)
  res.cookie('login',JSON.stringify(req.body), { expires: new Date(Date.now() + 1000*60*60)})
  res.send("cookie set")
})

router.get('/clearcookie',(req,res)=>{
  res.clearCookie("login")
  res.send("cookie deleted")
})

// router.get('/getcookie',(req,res)=>{
//   res.send(req.cookies.login)
// })


router.route('/validations').get((req,res)=>{
  res.render('validations')
})
.post([
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').notEmpty().withMessage(' Password is required'),
  body('cpassword').custom((value,{req})=>value==req.body.password).withMessage(' mismatch Password ')
],(req,res)=>{
  const errors=validationResult(req)
  if(!errors.isEmpty()){
    // return res.status(400).json({errors:errors.array()})

    // return res.render('validations',{
    //   errors:errors.array(),
    //   formdata:req.body
    // })

    //prev = {}
    //curr - errors object  -> {name:""}
    const errorMessages = errors.array().reduce((prev,curr)=>{prev[curr.path] = curr.msg;
      return prev
    },{})
  return res.render('validations',{
        errors:errorMessages,
        formdata:req.body
      })
  }
  else res.send("no error")
})


export default router;
