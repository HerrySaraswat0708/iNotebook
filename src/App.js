import React from "react";
import "./App.css";
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
       
        <Routes>
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/signup" element={<Registration/>}/>
          <Route exact path="/" element={<Home/>}/>
        </Routes>
    
      </Router>
    </NoteState>
      
    </>
  );
}
