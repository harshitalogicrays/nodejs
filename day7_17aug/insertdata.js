import con from './db.js'

let data = [
    ['aaa','aaa@gmail.com','aaa123'],
    ['bbb','bbb@gmail.com','bbb123'],
    ['ccc','ccc@gmail.com','ccc123'],
    ['ddd','ddd@gmail.com','ddd123'],
]

con.connect((err)=>{
    if(err) throw err

    // con.query("insert into user(name,email,password)values('nischay','nischay@test.com','nischay123')",(err,result)=>{
    //     if(err) throw err
    //     console.log(result)
    // })

    con.query("insert into user(name,email,password)values ?",[data],(err,result)=>{
        if(err) throw err
        console.log(result)
    })
})

con.end()