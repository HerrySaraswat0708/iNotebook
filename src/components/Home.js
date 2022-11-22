import React from "react";
import { useNavigate } from "react-router-dom";
import Notes from "./Notes";
import Navbar from "./Navbar";
export default function Home() {
  
  return (
    <>
    <Navbar />
    <div className="container">
         <Notes/>
     </div>
         
    </>
  );
}
