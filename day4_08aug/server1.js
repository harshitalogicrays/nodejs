import http from 'http'
import 'dotenv/config'
import fs from 'fs'
import url from 'url'
let PORT = process.env.port || 1000
let filedata =fs.readFileSync("index.html",'utf-8')
let list=fs.readFileSync('products.json','utf-8')
let filedata1 =fs.readFileSync("productcard.html",'utf-8')
let products = JSON.parse(list)
let result = products.map(item=>{
        let output = filedata1.replace('{{%IMG%}}',item.image)
        output =output.replace('{{%NAME%}}',item.name)
        output =output.replace('{{%PRICE%}}',item.price)
        output =output.replace('{{%STOCK%}}',item.stock)
        output =output.replace('{{%id%}}',item.id)
      return output
})
http.createServer((req,res)=>{           
                // let path=req.url
                let {query,pathname:path} = url.parse(req.url,true)
                if(path=='/' || path.toLocaleLowerCase()=='/home'){
                    res.writeHead(200,{'content-type':'text/html'})
                    res.end(filedata.replace('{{%CONTENT%}}',"This is Home Page"))
                }
                else if(path=='/about'){
                    res.writeHead(200,{'content-type':'text/html'})
                    res.end(filedata.replace('{{%CONTENT%}}',"This is about us Page"))
                }    
                else if(path=='/products'){
                    if(!query.id){
                        res.writeHead(200,{'content-type':'text/html'})
                        res.end(filedata.replace('{{%CONTENT%}}',result.join(',')))
                        // res.end(result)
                    }
                    else res.end(`${query.id} details`)
                   
                }
                else if(path=='/contact'){
                    res.writeHead(200,{'content-type':'text/html'})
                    res.end(filedata.replace('{{%CONTENT%}}',"This is contact us Page"))
                }               
                else {
                    res.writeHead(400,{msg:"something went wrong",'content-type':'text/html'})
                    res.end("Error - 404 file not found")
                }
  
}).listen(PORT,()=>console.log(`server started on http://localhost:${PORT}`))
