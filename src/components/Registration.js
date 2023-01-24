import React,{useState} from "react";
import {Link,useNavigate} from "react-router-dom";
export default function Registration(props) {
  const navigate = useNavigate()
  const [credential,setCredential] = useState({name:"",email:"",password:""})
  const handleSubmit = async (e)=>{
   e.preventDefault();
   const response = await fetch("http://localhost:3000/api/auth/createuser",{
     method:"POST",
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({name:credential.name,email:credential.email,password:credential.password})
  });

   const json = await response.json();
   console.log(json)
   
     localStorage.setItem('token',json.authtoken)
     navigate('/')
     alert('Account created successfully')
 
  }
  const onChange = (e)=>{
    setCredential({...credential,[e.target.name]:e.target.value})
}
  return (
    <>
  
      <div className="container my-5">
        <div className="container"style={{width:"60%",height:"100%",textAlign:"center"}}>
        <h1 style={{marginBottom:"7%"}}>iNotebook User Registration</h1>
        <form style={{margin:"auto",width:"80%"}} onSubmit={handleSubmit}>
          <div className="row mb-5" style={{margin:"auto",width:"90%"}}>
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                aria-label="First name"
                id="name"
                name="name"
                value={credential.name}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div className="row mb-5" style={{margin:"auto",width:"90%"}}>
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input type="email" className="form-control" placeholder="Email" id="email"
                value={credential.email} name="email"
                onChange={onChange} required/>
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

          <button type="submit" className="btn btn-primary mb-3">
            Register 
          </button>
          <br/>
          <Link to="/login"> Already have account?Sign in</Link>
        </form>
</div>
        
      </div>
    </>)
}
