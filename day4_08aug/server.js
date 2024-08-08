import http from 'http'
import 'dotenv/config'
import fs from 'fs'
let PORT = process.env.port || 1000
let filedata =fs.readFileSync("file1.html",'utf-8')
http.createServer((req,res)=>{
                console.log(req.url)
                if(req.url=='/'){
                    res.writeHead(200,{'content-type':'text/html'})
                    res.write("home page"); res.end()
                }
                else if(req.url=='/about'){
                    res.writeHead(200,{'content-type':'text/html'})
                    res.end(filedata)
                }
                else {
                    res.writeHead(400,{
                        msg:"something went wrong",'content-type':'text/html'})
                    res.end("Error - 404 file not found")
                }
  
}).listen(PORT,()=>console.log(`server started on http://localhost:${PORT}`))
