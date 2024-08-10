import http from 'http'
import 'dotenv/config'
import fs from 'fs'
let PORT = process.env.port || 1000

let server = http.createServer()
server.on('request',(req,res)=>{
   let rs = fs.createReadStream('largefile.txt','utf-8')
   let ws = fs.createWriteStream('largefile1.txt')
    rs.pipe(ws)
})
server.listen(PORT,()=>console.log(`server started on http://localhost:${PORT}`))
