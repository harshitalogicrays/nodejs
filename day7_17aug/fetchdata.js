import con from './db.js'
con.connect((err)=>{
    if(err) throw err
    // con.query("select * from user",(err,result)=>{
    //     if(err) throw err
    //     console.log(result)
    // })

    // con.query("select name,email from user",(err,result)=>{
    //     if(err) throw err
    //     console.log(result)
    // })
    // con.query("select * from user where id=3",(err,result)=>{
    //     if(err) throw err
    //     console.log(result)
    // })
    // con.query("select * from user where name='darsh'",(err,result)=>{
    //     if(err) throw err
    //     console.log(result)
    // })

    // con.query("select * from user where password LIKE '%da%'",(err,result)=>{
    //     if(err) throw err
    //     console.log(result)
    // })


    // con.query("select * from user where password LIKE '%da%' or name='aaa'",(err,result)=>{
    //     if(err) throw err
    //     console.log(result)
    // })

    // con.query("select * from user where password LIKE '%da%' and name='aaa'",(err,result)=>{
    //     if(err) throw err
    //     console.log(result)
    // })

    // con.query("select * from user where password LIKE ?",['n%'],(err,result)=>{
    //     if(err) throw err
    //     console.log(result)
    // })

    con.query("select name,email from user order by name desc",(err,result)=>{
        if(err) throw err
        console.log(result)
    })


    con.end()
})















