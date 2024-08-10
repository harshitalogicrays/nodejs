import http from 'http'
import 'dotenv/config'
import fs from 'fs'
let PORT = process.env.port || 1000

let server = http.createServer()
server.on('request',(req,res)=>{
   let rs = fs.createReadStream('new.txt','utf-8')
   let ws = fs.createWriteStream('new1.txt')
   rs.on('data',(chunk)=>{ws.write(chunk);ws.end()})
   ws.on('finish',()=>{ console.log("file written successfully")})
   rs.on('end',()=>{ res.end("written successfully") })
})
server.listen(PORT,()=>console.log(`server started on http://localhost:${PORT}`))
