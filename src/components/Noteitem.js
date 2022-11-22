 import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {notes,deleteNote,editNote} = context;
  const { note,updateNote } = props;
  
  return (
    <div className="col-md-3 my-2">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <span className="mx-2">
            <i className="fa fa-pencil-square-o" area-hidden="true" onClick={()=>{updateNote(note)}} />
          </span>
          <span className="mx-3">
            <i className="fa fa-trash" area-hidden="true" onClick={()=>{deleteNote(note._id)}} />
          </span>
          <img src="./edit.png" alt="..."/>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
