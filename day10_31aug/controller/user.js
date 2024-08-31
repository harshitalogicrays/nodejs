import users from '../public/users.js'

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