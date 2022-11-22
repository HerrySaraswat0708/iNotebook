import React from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Registration from "./components/Registration"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NoteState from "./context/notes/Notestate";
import Home from "./components/Home";
import About from "./components/About";

export default function App() {
  return (
    <>
    <NoteState>
      <Router>
       <Navbar/>
       <div className="container my-3">
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/signup" element={<Registration/>}/>
        </Routes>
      </div>
      </Router>
    </NoteState>
      
    </>
  );
}
