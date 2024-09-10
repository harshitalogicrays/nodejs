import express from 'express'
import multer from 'multer';
import path from 'path'
const router = express.Router();

const storage = multer.diskStorage({
  destination:'./public/uploads/',
  filename:(req,file,cb)=>{
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))}
})

// const upload = multer({
//   storage:storage,
//   limits:{fileSize:1024*1024},
//   fileFilter:(req,file,cb)=>{
//     checkfiletype(file,cb)}
// }).single('image')

const upload = multer({
  storage:storage,
  limits:{fileSize:1024*1024},
  fileFilter:(req,file,cb)=>{
    checkfiletype(file,cb)}
}).array('images',5)

let checkfiletype=(file,cb)=>{
  const filetypes= /jpg|jpeg|png|jfif|gif|webp/
  const ext = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)
  if(mimetype && ext){
    return cb(null,true)}
  else cb("Error : Image only")
}

/* GET home page. */
router.route('/').get((req, res)=> {res.render('index', { title: 'file Upload Demo' })})
                 .post((req,res)=>{
                    // upload(req,res,(err)=>{
                    //   if(err){
                    //     res.render('index',{err:err})  }
                    //   else if(req.file ==undefined){
                    //     res.render('index',{err:"Error: Please choose file"})    }
                    //   else {
                    //    res.render('index',{
                    //       err:'',
                    //       msg:"file uploaded",
                    //     file:`uploads/${req.file.filename}`})         
                    //   }
                    // })


                    upload(req,res,(err)=>{
                      if(err){
                        if(err instanceof multer.MulterError)
                        res.render('index',{err:"Error : File Size exceeds"}) 
                        else 
                        res.render('index',{err:err}) 
                      }
                      else if(req.files ==undefined || req.files.length==0){
                        res.render('index',{err:"Error: Please choose files"})    }
                      else {
                        const files = req.files.map(file=>`uploads/${file.filename}`)
                        res.render('index',{
                          err:'',
                          msg:"file uploaded",
                        files:files})
                      }
                    })
                 })

export default router
