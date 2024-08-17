// import fs from 'fs'
// import zlib from 'zlib'

// const rs = fs.createReadStream('day6_13aug.txt')
// const ws =  fs.createWriteStream('transform.txt.gz')
// rs.pipe(zlib.createGzip()).pipe(ws)
// ws.on('finish',()=>{
//     console.log("file successfully compressed")
// })



import fs from 'fs'
import zlib from 'zlib'

const rs = fs.createReadStream('transform.txt.gz')
const ws =  fs.createWriteStream('transform.txt')
rs.pipe(zlib.createGunzip()).pipe(ws)
ws.on('finish',()=>{
    console.log("file successfully decompressed")
})