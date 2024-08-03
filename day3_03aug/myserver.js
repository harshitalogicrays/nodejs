import http from 'http'
import 'dotenv/config'
import fs from 'fs'

let PORT = process.env.port || 1000
http.createServer((req,res)=>{
    fs.readFile("file1.html","utf-8",(err,data)=>{
        if(err) console.log(err.message)
        else {
                res.write(data)
                res.end()
        }
    })

}).listen(PORT,()=>console.log(`server started on http://localhost:${PORT}`))
