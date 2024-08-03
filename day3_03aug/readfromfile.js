import fs from 'fs'


// fs.readFile("file1.html","utf-8",(err,data)=>{
//     if(err) console.log(err.message)
//     else console.log(data)
// })
// console.log("last ")

let res = fs.readFileSync("file1.html","utf-8")
console.log(res)
console.log("last")