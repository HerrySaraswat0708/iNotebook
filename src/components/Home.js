import React from "react";
import Alert from "./Alert";
// import { useNavigate } from "react-router-dom";
import Notes from "./Notes";
// import Navbar from "./Navbar";
export default function Home(props) {
  
  return (
    <>
    <div className="container">
         <Notes showAlert={props.showAlert}/>
     </div>
         
    </>
  );
}
