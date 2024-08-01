import http from 'http'
import fact from './fact.js'
import add from './add.js'
import 'dotenv/config'
import prompt from 'prompt'
prompt.start();
prompt.get(['number1','number2'], (err, result)=> {
    if(err) throw new err
    console.log('Command-line input received:');
    console.log('my num: ' + result.number1, result.number2);
    let server = http.createServer((req,res)=>{
        res.write(fact(result.number1).toString())
        res.write(add(result.number1,result.number2).toString())
        res.end()
    })
    
    let port = process.env.PORT || 1000
    server.listen(port,()=>{
        console.log(`server started at http://localhost:${port}`)
    })
  });

