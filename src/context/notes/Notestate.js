import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  // const host = "http://localhost:3000"

  const note = []
  const [notes, setNotes] = useState(note)

  const [About, setAbout] = useState(false)

  const update = () => {
    setAbout(!About)
  }


  // Getting user's data from the database

  const getUser = async () => {
    const response = await fetch(`http://localhost:3000/api/auth/getUser`, {
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

  // Adding a note on :
  // 1. Database
  const addNote = async (title, description, tag) => {
    const response = await fetch(`http://localhost:3000/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag })
    });

    // 2. Frontend
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

  // Deleting a note from :
  // 1. Database

  const deleteNote = async (id) => {
    console.log("Deleted")
    const response = await fetch(`http://localhost:3000/api/notes/deletenotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }

    });
    console.log(response.json())
    // 2. Frontend 

    const json = await response.json();
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // Function to get all notes from database
  const getNotes = async () => {
    const response = await fetch(`http://localhost:3000/api/notes/fetchallnotes`, {
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

  // Function to edit a note on :

  const editNote = async (id, title, description, tag) => {

    // 1. Database  
    const response = await fetch(`http://localhost:3000/api/notes/Updatenotes/${id}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {

        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })

    });
    console.log(response.json())
    // 2. Frontend

    const newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index]
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)


  }

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, About, update }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;