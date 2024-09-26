import express from 'express'
import {  allUsers, authUser, registerUser } from '../controller/userController.js'
import authorized from '../middleware/authMiddleware.js';
const router = express.Router();

// http://localhost:4000/
router.route('/').post(registerUser).get( authorized,allUsers)
router.route('/login').post(authUser)



export default router