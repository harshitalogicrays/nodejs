import fs from 'fs'
import prompt from 'prompt'
prompt.start()
prompt.get(['data'],(err,result)=>{
    if(err) throw err
    else    {
        // console.log(result.data)
        fs.appendFile("mytxt1.txt",`${result.data}\r\n`,(err)=>{
            if(err) throw err
            console.log("file appended successfully")
        })
    }
})

//if file available then append data into it, if not then create file