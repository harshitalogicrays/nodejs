import express from 'express'
import { indexfun, postfun } from '../controller/index.js';
const router = express.Router();

/*
//http://localhost:3000
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', names:["erer","Erer","erer","erer","rwr"]  , isActive:true ,name:"Happy"});
  // res.json({msg:'hello from server'})
  // res.send("hello from index route")
});
 */

// router.get('/',indexfun)
// router.post('/',postfun)

router.route('/').get(indexfun)
                 .post(postfun)

export default router
