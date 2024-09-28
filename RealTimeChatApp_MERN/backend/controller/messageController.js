import asyncHandler from "express-async-handler"
import Message from "../model/messageModel.js";
import Chat from "../model/chatModel.js";
import User from "../model/userModel.js";

export const allMessages = asyncHandler(async(req,res)=>{
    try{
        const messages = await Message.find({chat:req.params.chatId})
        .populate('sender',"name profilepic email")
        .populate('chat')
        res.json(messages)
    }
    catch(error){
        res.status(400);
        throw new Error(error.message);  
    }
})

export const sendMessage = asyncHandler(async(req,res)=>{
    const {chatId,content} = req.body
    if(!content || !chatId){
        console.log("Invalid data")
        return res.sendStatus(400)
    }
    let msg  = {sender:req.user._id,content:content,chat:chatId}
    try{
        var message  = await Message.create(msg)

        message = await message.populate("sender", "name profilepic");
        message = await message.populate("chat");
        message = await User.populate(message, {
        path: "chat.users",
        select: "name profilepic email",
        });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    res.json(message);
    }
    catch(error){
        res.status(400);
        throw new Error(error.message);  
    }

})