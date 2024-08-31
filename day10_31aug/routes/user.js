import express from 'express'
import { deleteuser, getuserbyid, getusers, patchuser, postuser, putuser } from '../controller/user.js'
const router = express.Router()

//http://localhost:3000/user
router.get('/',getusers)
router.get('/:id',getuserbyid)
router.post('/',postuser)
router.put('/:id',putuser)
router.patch('/:id',patchuser)
router.delete('/:id',deleteuser)

export default router