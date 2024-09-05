let indexfun=(req,res)=>{
    res.render("index");
}

let postfun=(req,res)=>{
    res.send(req.body);
}

export {indexfun,postfun}
