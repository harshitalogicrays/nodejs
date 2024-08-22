let users =  [
    {
      "id": "f0f2",
      "username": "aaa",
      "email": "aaa@gmail.com",
      "password": "aaa123",
      "cpassword": "aaa123",
      "role": "1",
      "createdAt": "2024-06-29T04:24:05.643Z"
    },
    {
      "id": "094d",
      "username": "Admin",
      "email": "admin@gmail.com",
      "password": "admin123",
      "cpassword": "admin123",
      "role": "0",
      "createdAt": "2024-06-29T04:26:33.078Z"
    },
    {
      "id": "c08f",
      "username": "ram",
      "email": "ram@gmail.com",
      "password": "ram123",
      "cpassword": "ram123",
      "role": "1",
      "createdAt": "2024-06-29T04:26:41.177Z"
    },
    {
      "id": "9937",
      "username": "aaa",
      "email": "aaa@gmail.com",
      "password": "aaa123",
      "cpassword": "aaa123",
      "role": "1",
      "createdAt": "2024-07-06T04:08:11.521Z"
    },
    {
      "id": "728c",
      "name": "neha",
      "email": "neha@gmail.com",
      "password": "neha123",
      "confirmPassword": "neha123"
    },
    {
      "id": "b339",
      "name": "siya",
      "email": "siya@gmail.com",
      "password": "siya123",
      "confirmPassword": "siya123"
    },
    {
      "id": "016e",
      "name": "yogendra",
      "email": "yogendra@gmail.com",
      "password": "yogi123",
      "confirmPassword": "yogi123"
    }
  ]

let getusers = (req,res)=>{  
    if(Object.keys(req.query).length!=0){
        let key= Object.keys(req.query)
        let val = Object.values(req.query)
        // console.log(key,val) //['username'] ['aaa']
        const filterusers = users.filter(item=>item[key[0]]==val[0])
        // console.log(filterusers)
        res.send(filterusers)
    }
    else res.send(users)
}

let getuserbyid = (req,res)=>{
    let id  = req.params.id
    const finduser = users.find(item=>item.id==id)
    if(!finduser) res.sendStatus(404)
    else  res.status(200).send(finduser) 
}

let postuser=(req,res)=>{
    // res.send(req.body)
    let obj ={id:Date.now(),...req.body}
    users.push(obj)
    res.status(200).send({"msg":"user added"})
}

let putuser =(req,res)=>{
    let id  = req.params.id
    const finduserindex = users.findIndex(item=>item.id==id)
    if(finduserindex == -1 ) res.status(404).send({"msg":"bad request"})
    else  {
        users[finduserindex] = {id:id,...req.body}
        res.status(200).send({"msg":"user updated"})
    }
}

let patchuser = (req,res)=>{
    let id  = req.params.id
    const finduserindex = users.findIndex(item=>item.id==id)
    if(finduserindex == -1 ) res.status(404).send({"msg":"bad request"})
    else  {
        users[finduserindex] = {...users[finduserindex], ...req.body}
        res.status(200).send({"msg":"user updated"})
    }
}

let deleteuser=(req,res)=>{
    let id  = req.params.id
    const finduserindex = users.findIndex(item=>item.id==id)
    if(finduserindex == -1 ) res.status(404).send({"msg":"bad request"})
    else  {
        users.splice(finduserindex,1)
        res.status(200).send({"msg":"user deleted"})
    }
}

export {getusers,getuserbyid,postuser,putuser,patchuser,deleteuser}