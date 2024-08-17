import 'dotenv/config'
import crypto from 'crypto'
const start =Date.now()
/*crypto.pbkdf2Sync("password","salt",10000,512,"sha512")
console.log('Hash',Date.now()-start)
crypto.pbkdf2Sync("password","salt",10000,512,"sha512")
console.log('Hash',Date.now()-start)
crypto.pbkdf2Sync("password","salt",10000,512,"sha512")
console.log('Hash',Date.now()-start)
crypto.pbkdf2Sync("password","salt",10000,512,"sha512")
console.log('Hash',Date.now()-start)
 */

/*
const MAX_CALLS=4
for(let i=0;i<MAX_CALLS;i++){
crypto.pbkdf2("password","salt",10000,512,"sha512",()=>{
    console.log('Hash',Date.now()-start)
})
} */

process.env.UV_THREADPOOL_SIZE=8
const MAX_CALLS=4
for(let i=0;i<MAX_CALLS;i++){
crypto.pbkdf2("password","salt",10000,512,"sha512",()=>{
    console.log('Hash',Date.now()-start)
})
}














