import React, { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import {useNavigate} from "react-router-dom";
const Notes = () => {
  const navigate = useNavigate()
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNotes();}
    else{
      navigate('/login')
    }
  }, []);
  const editcontext = useContext(noteContext);
  const {editNote} = editcontext;
  const [note,setNote] = useState({id:"",etitle:"",edescription:"",etag:""});
  const updateNote = (currentNote) => {
    ref.current.click();
    
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  };
  const ref = useRef(null);
  const refClose = useRef(null);
  const handleClick = (e)=>{
    
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    
}
const onChange = (e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}
  return (
    <>
      <AddNote />
      <button  ref={ref} type="button"  className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
       
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body"> <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="email"
            className="form-control"
            id="etitle"
            value={note.etitle}
            name="etitle"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
    
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
           Description
          </label>
          <input
            type="text"
            className="form-control"
            value={note.edescription}
            id="edesc"
            name="edescription"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
           Tag
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="General"
            id="epass"
            value={note.etag}
            name="etag"
            onChange={onChange}
          />
        </div>
      
        
      </form></div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button disabled = {note.etitle.length<3 || note.edescription.length<5} type="button" onClick={handleClick} className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container ">        {notes.length===0 && 'No Notes to Display'}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
