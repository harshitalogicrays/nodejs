import http from 'http'
import fact from './fact.js'
// console.log(fact(5))
//http://localhost:2000
let server = http.createServer((req,res)=>{
    // res.write("10")
        res.write(fact(5).toString())
    res.end()
})

let PORT = 2000
server.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`)
})