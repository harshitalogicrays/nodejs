import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const postDetails = async(pics) => {
    setPicLoading(true)
    if(pics==undefined){toast.error("Please select an image");return}
    if(pics.type=="image/jpg"||pics.type=="image/jpeg" || pics.type=="image/png"){
      const data =new FormData()
      data.append("file",pics)
      data.append('upload_preset',"chatapp")
      data.append("cloud_name","harshitalogicrays")
      try{
       let res =  await  fetch("https://api.cloudinary.com/v1_1/harshitalogicrays/image/upload",{
          method:"POST", body:data })
        let data1 =await res.json()
        // console.log(data1.url)
        setPic(data1.url.toString())
        setPicLoading(false)
      }
      catch(err){
        toast.error(err.message)
        setPicLoading(false)
      }
     
    }
  };

  const handleRegister = async(e) => {
    e.preventDefault();
   setPicLoading(true)
   if(!name || !email || !password  || !confirmPassword){
    toast.error("please fill fields")
   }
   else if(password != confirmPassword){
    toast.error("Password do not match")
   }
   else {
    let obj = {name,email,password,profilepic:pic}
    try{
        let res  = await fetch("http://localhost:4000",{
          method:"POST",
          headers:{'content-type':'application/json'},
          body:JSON.stringify(obj)
        })
        let data =await res.json()
        console.log(data)
        localStorage.setItem("userInfo",JSON.stringify(data))
      toast.success("registered successfully")
      navigate('/chats')
      setPicLoading(false)
    }
    catch(err){
      toast.error(err.message)
      setPicLoading(false)
    }
   }
  };


  return (
    <div className="container shadow">
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Confirm Password:</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Upload File:</label>
          <input 
            type="file" 
            className="form-control"  accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </div>
        <div className="d-grid gap-2">   
        <button type="submit" className="btn btn-primary" >
          {picLoading? <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>:"Register"}</button></div>
        <hr />
          <p>Already an Account?? <Link to='/login'>SignIn</Link></p>
   
      </form>
    </div>
  );
};

export default Register;
