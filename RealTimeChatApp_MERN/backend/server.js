import express from 'express'
import 'dotenv/config'
import connectDB from './config/db.js'
import userRouter from './routes/user.js'
import chatRouter from './routes/chat.js'
import messageRouter from './routes/message.js'
import cors from 'cors'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import {Server} from 'socket.io'
import http from 'http'
import Message from './model/messageModel.js'

const app = express()
connectDB(process.env.DB_URL)
app.use(express.json())
app.use(cors())
app.use(notFound)
app.use(errorHandler)
app.use('/',userRouter)
app.use('/chat',chatRouter)
app.use('/message',messageRouter)



let port = process.env.PORT || 3000
let server = app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
})


const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
    },
  });

io.on("connection",(socket)=>{
    console.log("user connected")

    socket.on("setup",(user)=>{
        socket.join(user._id)
        socket.emit("connected")
    })

    socket.on("join chat",(room)=>{
        socket.join(room)
        console.log("user joined the chat room")
    })
    socket.on("typing",(room)=>{
        socket.in(room).emit("typing")
        socket.on("stop typing",(room)=>{
            socket.in(room).emit("stop typing")
        })        
    })

    socket.on("new message",(msg)=>{
        let chat = msg.chat
        if(!chat.users) return console.log(`${chat.users} not defined`)
        chat.users.forEach((user)=>{
        if(user._id == msg.sender._id) return;
        socket.in(user._id).emit("message received",msg)
    })
    })

    socket.on('messageRead', async ({ messageId, userId }) => {
        try {
          await Message.findByIdAndUpdate(
            messageId,
            { $addToSet: { readBy: userId } }, // $addToSet prevents duplicate entries
            { new: true }
          );
          io.emit('messageRead', { messageId, userId });
  
        } catch (error) {
          console.error('Error updating readBy field:', error);
        }
      });


    socket.off("setup",()=>{
        console.log("user disconnected")
        socket.leave(user._id)
    })
})
