import React,{useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'
// import Navbar from './Navbar';

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note,setNote] = useState({title:"",description:"",tag:""});
    const handleClick = (e)=>{
        e.preventDefault();
       addNote(note.title,note.description,note.tag);
       setNote({title:"",description:"",tag:""})
    }
    const onChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <> 
       <div>
      <h1>Add a Note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="email"
            className="form-control"
            id="title" 
            value={note.title}

            name="title"
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
            id="desc"
             value={note.description}
            name="description"
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
            value={note.tag}
            id="pass"
            name="tag"
            onChange={onChange}
          />
        </div>
      
        <button disabled = {note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
          Save
        </button>
      </form>
      
    </div></>
  )
}

export default AddNote
