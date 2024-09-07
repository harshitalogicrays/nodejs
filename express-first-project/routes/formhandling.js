import express from 'express'
import { deleteUser, displayform, displaypostform, displayusers, editUser, fetchformdata, fetchpostformdata, updateUser } from '../controller/formhandling.js';
const router = express.Router();
//  /form
router.route('/').get(displayform)
router.route('/submit').get(fetchformdata)

router.route('/post').get(displaypostform)
router.route('/post/submit').post(fetchpostformdata)

router.get('/user/get',displayusers)
router.get('/user/delete/:id',deleteUser)
router.get('/user/edit/:id',editUser)
router.put('/user/update/:id',updateUser)

export default router