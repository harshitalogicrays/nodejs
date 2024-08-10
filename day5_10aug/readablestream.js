import http from 'http'
import 'dotenv/config'
import fs from 'fs'
let PORT = process.env.port || 1000

let server = http.createServer()
server.on('request',(req,res)=>{
   let rs = fs.createReadStream('transform.txt','utf-8')
   rs.on('data',(chunk)=>{  res.write(chunk)})
   rs.on('end',()=>{ res.end() })
   rs.on('error',(err)=>res.end(err.message))
})
server.listen(PORT,()=>console.log(`server started on http://localhost:${PORT}`))
