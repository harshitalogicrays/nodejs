import http from 'http'
import fact from './fact.js'
import 'dotenv/config'

let server = http.createServer((req,res)=>{
    // res.write("10")
    // res.write(fact(5).toString())

    res.writeHead(200 , {'content-type':'application/json'})
    res.write("<h1>header demo</h1>")
    res.write(JSON.stringify({name:'happy',age:20}))
    res.end()
})

let port = process.env.PORT || 1000
server.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
})