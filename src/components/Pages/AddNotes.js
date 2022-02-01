import { Fragment, useContext,useEffect } from "react"
import NoteForm from '../Notes/NoteForm'
import NotesContext from "../../store/notes-context"

const AddNotes=() =>{
    console.log('In AddNotes')

    const notesCtx = useContext(NotesContext)  

    useEffect(()=>{
        console.log('In useeffect of  AddNotes')
        console.log('notesCtx= ', notesCtx.editMode)
        notesCtx.funcChangeMode(false)  // to load Noteform for adding a new note by setting false
       // notesCtx.funcInitializeNotes();   // to initialize notes to empty array for refresh loading
        //notesCtx.startTimestamp=-1;     // to set the start to default -1 for laoding from first record
    })   

 
  return(
    <Fragment>
            <h2> Please Add Notes</h2>
            <NoteForm />
           
     </Fragment> 

 )   
}


export default AddNotes