import express from 'express'
import authorized from '../middleware/authMiddleware.js';
import { allMessages, sendMessage } from '../controller/messageController.js';
const router = express.Router();

//http://locahost:4000/message
router.route("/:chatId").get(authorized, allMessages);
router.route("/").post(authorized, sendMessage);


export default router