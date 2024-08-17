import mysql from 'mysql2'
const con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'31stjulmern'
})

// con.connect((err)=>{
//     if(err) throw err
//     console.log("connected")
// })
export default con