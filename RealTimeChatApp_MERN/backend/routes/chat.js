import express from 'express'
import authorized from '../middleware/authMiddleware.js';
import { accessChat,fetchAllChats,createGroup,removeFromGroup,renameGroup,addToGroup } from '../controller/chatController.js';
const router = express.Router();

//http://locahost:4000/chat
router.route("/").post(authorized, accessChat);
router.route("/").get(authorized, fetchAllChats);
router.route("/creategroup").post(authorized, createGroup);
router.route("/renamegroup").put(authorized, renameGroup);
router.route("/removefromgroup").put(authorized, removeFromGroup);
router.route("/addtogroup").put(authorized, addToGroup);

export default router