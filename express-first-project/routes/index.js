import express from 'express'
const router = express.Router();

//http://localhost:3000
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', names:["erer","Erer","erer","erer","rwr"]  , isActive:true ,name:"Happy"});
  // res.json({msg:'hello from server'})
  // res.send("hello from index route")
});

export default router
