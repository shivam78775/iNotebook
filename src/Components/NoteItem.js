import React , { useContext } from 'react'
import noteContext from '../Context/Notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;

    const { note, updateNote } = props;
    return (
        <>
            <div className="col-md-3" id='noteItems'>
                <div className="card my-3 bg-color"  >
                    <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between">
                            <h5 className="card-title">{note.title}</h5>
                            <div>
                                <i className="fa-sharp fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);
                                        props.showAlert("Deleted Successfully", "success")

                                }}></i>
                                <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                            </div>
                        </div>
                        <p className="card-text">{note.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem