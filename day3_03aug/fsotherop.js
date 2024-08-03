import fs from 'fs'
// import fs from 'fs/promises'
// fs.copyFile('mytxt1.txt','./newdir/myfile.txt',(err)=>{
//     if(err) throw err
//     console.log("file copied")
// })

// fs.rename('./newdir/myfile.txt','./newdir/myfile1.txt',(err)=>{
//         if(err) throw err
//         console.log("file renamed")
//     })

// fs.unlink('./newdir/myfile1.txt',(err)=>{
//     if(err) throw err
//     console.log("file deleted")
// })

// let fun=async()=>{
//     try{    
//         let res = await fs.readFile("file1.html","utf-8")
//         console.log(res)
//     }
//     catch(err){console.log(err)}
// }
// fun()

// let fun=async()=>{
//     try{    
//         let res = await fs.open("file1.html","r")
//         console.log(res)
//     }
//     catch(err){console.log(err)}
// }
// fun()

 
  fs.open('log.txt', 'a', 777, ( e, id )=> {
    fs.write(id,"rewrwrwr",null,'utf-8',()=>{
        fs.close(id,()=>{console.log("file writted")})
    })
})
