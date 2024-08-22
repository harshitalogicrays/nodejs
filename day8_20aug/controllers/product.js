let getproducts =(req,res)=>{res.send("products get route")}

let getproductbyid =(req,res)=>{res.send(`products get route -  ${JSON.stringify(req.params)}`)}

export {getproducts,getproductbyid}