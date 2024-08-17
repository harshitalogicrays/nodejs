import con from './db.js'
con.connect((err)=>{
    if(err) throw err
    con.query("update user set password='aaaaaaaaaa',email='aaa@test.com' where name='aaa'",(err,result)=>{
        if(err) throw err
        console.log(result)
    })
    con.end()
})
