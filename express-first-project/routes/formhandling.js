import express from 'express'
import { displayform, displaypostform, fetchformdata, fetchpostformdata } from '../controller/formhandling.js';
const router = express.Router();
//  /form
router.route('/').get(displayform)
router.route('/submit').get(fetchformdata)

router.route('/post').get(displaypostform)
router.route('/post/submit').post(fetchpostformdata)

export default router