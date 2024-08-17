import con from './db.js'
con.connect((err)=>{
    if(err) throw err
    // con.query("delete from user  where name='aaa'",(err,result)=>{
    //     if(err) throw err
    //     console.log(result)
    // })

    con.query("drop table user",(err,result)=>{
        if(err) throw err
        console.log(result)
    })
    con.end()
})
