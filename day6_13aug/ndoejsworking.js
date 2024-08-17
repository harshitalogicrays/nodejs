import http from 'http'
import fs from 'fs'

console.log("start")

setTimeout(()=>{
    console.log("settimeout called")
},0)

// fs.readFile("transform.txt",'utf-8',(err,data)=>{
//     console.log(data)
// })
setImmediate(()=>{console.log("setImmediate called")})
process.nextTick(()=>console.log('process.nextTick called'))
console.log('last')