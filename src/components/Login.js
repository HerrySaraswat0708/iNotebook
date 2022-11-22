import React,{useState} from 'react';
import {Link,useNavigate} from "react-router-dom";
// import Navbar from './Navbar';
const Login =  () => {
  const navigate = useNavigate()
  const [credential,setCredential] = useState({email:"",password:""})
  const handleSubmit = async (e)=>{
   e.preventDefault();
   const response = await fetch("http://localhost:3000/api/auth/login",{
     method:"POST",
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({email:credential.email,password:credential.password})
  });

   const json = await response.json();
   console.log(json)
   if(json.success){
     localStorage.setItem('token',json.authtoken)
     navigate('/')
    }
   else{
    alert("Invalid Credentials")
   }
  }
  const onChange = (e)=>{
    setCredential({...credential,[e.target.name]:e.target.value})
}


  return (
    <>
    
    <div className="container my-5">
      <div className="container"style={{width:"60%",height:"100%",textAlign:"center"}}>
      <h1 style={{marginBottom:"7%"}}>iNotebook User Login</h1>
      <form style={{margin:"auto",width:"80%"}} onSubmit={handleSubmit}>
        
        <div className="row mb-5" style={{margin:"auto",width:"90%"}}>
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input type="email" className="form-control" value={credential.email} id="email" name="email" onChange={onChange} placeholder="Email"  required/>
          </div>
        </div>

        <div className="row mb-5" style={{margin:"auto",width:"90%"}}>
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              id="password"
              name="password"
              value={credential.password} 
              onChange={onChange}
              
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mb-3" >
          Login
        </button><br/>
        <Link to="/signup">Doesn't have account?Register here</Link>
      </form>
</div>
      
    </div>
  </>
  )
}
export default Login;