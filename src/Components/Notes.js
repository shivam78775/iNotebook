import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteItem from './NoteItem';
import AddNote from './AddNote'
import noteContext from '../Context/Notes/noteContext'
import { useNavigate } from 'react-router-dom';



const Notes = (props) => {

  const context = useContext(noteContext);
  let navigate = useNavigate();

  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){

      getNotes()
    }
    else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id , etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }
  const ref = useRef(null)
  const refClose = useRef(null)

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" });

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("Updated Successfully", "success")
                        
  };

const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
};

  return (
    <>
      <div id="notes">
      <AddNote showAlert={props.showAlert}/>
      <div id="modal">
      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              </div>
            <div className="modal-body">
              <form>
                <div className="mb-3 my-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary " data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={ note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="row my-3">
        <h1 className='heading'>Your Notes</h1>
        <div className="container">
        {notes.length === 0 && "No notes to display"}
        </div>
        {Array.isArray(notes) && notes.map((note) => {
  return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
})}

        
        
      </div>
      </div>
    
    </>
  )
}

export default Notes