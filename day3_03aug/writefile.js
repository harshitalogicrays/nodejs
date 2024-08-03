import fs from 'fs'
import prompt from 'prompt'
prompt.start()
prompt.get(['data'],(err,result)=>{
    if(err) throw err
    else    {
        // console.log(result.data)
        fs.writeFile("mytxt.txt",result.data,(err)=>{
            if(err) throw err
            console.log("file written successfully")
        })
    }
})

//if file available then overwrite it, if not then create file