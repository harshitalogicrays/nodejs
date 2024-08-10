import http from 'http'
import 'dotenv/config'
import fs from 'fs'
let PORT = process.env.port || 1000
// let server  = http.createServer((req,res)=>{
//         //  fs.readFile("largefile.txt",'utf-8',(err,data)=>{
//         //     if(err) console.log(err.message)
//         //     else {
//         //             res.write(data)
//         //             res.end()
//         //      }
//         //  }) 
//         fs.readFile("largefile.txt",'utf-8',(err,data)=>{
//             if(err) console.log(err.message)
//             else {
//                  fs.writeFile("newfile.txt",data,(err)=>{
//                     if(err) console.log(err.message)
//                     else {
//                         res.write(data)
//                         res.end()}
//                 })                    
//              }
//          })         
// })
// server.listen(PORT,()=>console.log(`server started on http://localhost:${PORT}`))


let server = http.createServer()
server.on('request',(req,res)=>{
    res.end("using event")
})
server.listen(PORT,()=>console.log(`server started on http://localhost:${PORT}`))
