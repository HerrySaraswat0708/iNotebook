import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="col-md-3 my-2">
      <div className="card">
        <div className=" card-body">                                             
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <button className="btn btn-sm btn-primary mx-2" onClick={() => { deleteNote(note._id) }}>Delete Note</button>

          <button className="btn btn-sm btn-primary" onClick={() => { updateNote(note) }}>Update Note</button>
        </div>
      </div>
    </div>
  );
};        

export default Noteitem;
