import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { toast } from 'react-toastify';
const Login = () => {
  const navigate=useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true);
    if (!email || !password){toast.error("please fill fields");setLoading(false)}
    else{
      try{
        let res  = await fetch("/api/login",{
          method:"POST",
          headers:{'content-type':'application/json'},
          body:JSON.stringify({email,password})
        })
        let data =await res.json()
        console.log(data)
        localStorage.setItem("userInfo",JSON.stringify(data))
      toast.success("loggedIn successfully")
      navigate('/chats')
      setLoading(false)
    }
    catch(err){
      toast.error(err.message)
      setLoading(false)
    }
    }
  };

  return (
    <div className="container shadow p-2">
      <form onSubmit={submitHandler}>
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
        <div className=" mb-3">
          <label>Password:</label>
          <div className="input-group">
          <input
             type={show ? "text" : "password"}
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            
          />
              <button type="button" className='btn btn-primary' onClick={handleClick}>
              {show ? <BsEyeFill /> :  <BsEyeSlashFill />}
            </button>
            </div>
        </div>
        <div className="d-grid gap-2">        
          <button type="submit" className="btn btn-primary">Login</button>
          </div>
          <hr />
          <p>Create an Account?? <Link to='/register'>Signup</Link></p>
      </form>
    </div>
  );
};

export default Login;
