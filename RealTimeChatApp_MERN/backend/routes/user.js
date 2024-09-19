import express from 'express'
import { getUsers } from '../controller/userController.js'
const router = express.Router();

// http://localhost:4000/
router.route('/').get(getUsers)


export default router