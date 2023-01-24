import React from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Registration from "./components/Registration"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NoteState from "./context/notes/Notestate";
import Home from "./components/Home";
import About from "./components/About";

import { useState } from "react";
export default function App() {

  const [alert,setAlert] = useState(null)
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500)
  }
  return (
    <>
    <NoteState>
      <Router>
       <Navbar showAlert={showAlert}/>   
       
       <div className="container my-3">
        <Routes>
          <Route exact path="/Home" element={<Home showAlert={showAlert}/>}/>
          <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/signup" element={<Registration showAlert={showAlert}/>}/>
        </Routes>
      </div>
      </Router>
    </NoteState>
      
    </>
  );
}
