import React,{useEffect} from "react";
import {Link,useLocation, useNavigate} from "react-router-dom";
// import noteContext from "../context/notes/noteContext";
export default function Navbar(props) {
  // const context = useContext(noteContext);
  // const { About } = context;
  const navigate = useNavigate();
  let location = useLocation();
  useEffect(()=>{
   
  },[location]);
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate('/login')

  }
  
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="?">iNotebook</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        { localStorage.getItem('token') && <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/'?"active":""}`} aria-current="page" to='/'>Home</Link>
        </li>}
        {localStorage.getItem('token') && <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/about'?"active":""}`} to="/about">About</Link>
        </li>}
      </ul>
      {!localStorage.getItem('token')?"":<button className="btn btn-danger mx-2" onClick={handleLogout}>Logout</button>}
    </div>
  </div>
</nav>    </>
  );
}
