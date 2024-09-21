import express from 'express'
import {  authUser, registerUser } from '../controller/userController.js'
const router = express.Router();

// http://localhost:4000/
router.post('/',registerUser)
router.route('/login').post(authUser)


export default router