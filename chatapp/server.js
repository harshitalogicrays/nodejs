import express from 'express'
import 'dotenv/config'
import http from 'http'
import path from 'path'
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const __dirname =path.resolve()
app.use(express.static(path.join(__dirname,'public')))

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html'); });

io.on('connection',(socket)=>{  console.log("A user created")

    socket.on('set username',(username)=>{
        if(username){
            socket.username=username
            io.emit('user connected', `${username} has joined the chat`)   }
    })

    socket.on('chat message', (msg) => {
       if(socket.username){
        io.emit('chat message',{username:socket.username,message:msg})
       }
       else console.log("Username not set")
      });

    socket.on('disconnect',()=>{
        if(socket.username){
            io.emit('user disconnected', `${socket.username} has left the chat`)
        }
    })
})


let PORT = process.env.PORT
  server.listen(PORT , ()=>{
    console.log(`Server started at http://localhost:${PORT}`)
  })