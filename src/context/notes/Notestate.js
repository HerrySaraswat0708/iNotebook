import  { useState } from "react";
import noteContext from "./noteContext";
// import Noteitem from "C:/Users/Akshay/Desktop/React/mynotebook/src/components/Noteitem";
const NoteState = (props)=>{
    // const host = "http://localhost:3000"
    
    const note=[]
    const [notes,setNotes] = useState(note)
    
    const [About,setAbout] = useState(false)

    const update = ()=>{
       setAbout(!About)
    }



    const getUser = async ()=>{
      const response = await fetch(`http://localhost:3000/api/auth/getUser`,{
        method: 'POST',
        headers: {
          "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token'),
        },
      
    });
    const json = await response.json()
    return json
    }

    const addNote = async (title,description,tag)=>{
      
      // Adding a note to database

      const response = await fetch(`http://localhost:3000/api/notes/addnotes`,{
        method: 'POST',
        headers: {
          "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({title,description,tag})
    });

    // Adding a note on frontend

    const json = await response.json()
    const user = getUser();
    console.log(user)
      const note = {
        "_id": json._id,
        "user": user._id,
        "title": title,
        "description": description,
        "tag": tag,
        
        "__v": 0
      }
      setNotes(notes.concat(note))
     
    }
    
    // Deletion from database code
    
    const deleteNote = async (id)=>{
      const response = await fetch(`http://localhost:3000/api/notes/deletenotes/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
        }
       
    });
   console.log(response.json())
    // Deletion from frontend code
    
    // const json = await response.json();
  
    const newNotes = notes.filter((note)=>{return note._id !== id})
    setNotes(newNotes)
    }

    // Function to get all notes from database

    const getNotes = async ()=>{
      
      // Get all notes from database

      const response = await fetch(`http://localhost:3000/api/notes/fetchallnotes`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
        }
      
    });
    
    // Showing all notes on frontend

    const json = await response.json();
   
    setNotes(json)

  }
 
  // Function to edit a note 

    const editNote = async (id,title,description,tag)=>{
      

       // Editing a note in database

      const response = await fetch(`http://localhost:3000/api/notes/Updatenotes/${id}`,{
        method: 'PUT',
        mode:'cors',
        headers: {
          
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
        
      });
  console.log(response.json())
      // Editing a note on frontend

      const newNotes = JSON.parse(JSON.stringify(notes))
      for(let index=0;index<newNotes.length;index++)
      {
           const element = newNotes[index]
           if(element._id === id)
           {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
           }
    }
    setNotes(newNotes)
    
    
  }
  return (
    <noteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes,About,update}}>
    
        {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;