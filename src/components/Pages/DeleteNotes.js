import { useContext, useEffect} from 'react'
import NotesContext from '../../store/notes-context';
import useFetch from '../Hooks/useFetch'
import { useHistory } from 'react-router-dom';



const DeleteNotes =  () =>{

    const history = useHistory();

    const { isLoading, error, loadData   } = useFetch( '', '', '' );   // call useFecth hook

    const notesCtx= useContext(NotesContext)  

    console.log(notesCtx.editCurrNote)  //note which is to be deleted in retrieved from this
 
    console.log(notesCtx.notes)   //complete note which is before delete

     useEffect(()=>{

            console.log('(useeffect) in deleteNotes')

            async function deleteNote()
            {
      
              const response =  await loadData(notesCtx.editCurrNote,'DELETE')  //calls Hook function loadData for deleting
              if(response.ok===true)
                  {
                   const updatedNotes= notesCtx.notes.filter((note)=>note.note_id !== notesCtx.editCurrNote.id);
                   console.log(updatedNotes)
                   notesCtx.funcInitializeNotes()  //flush all the records in dbnotesCtx
                   notesCtx.funcLoadData(updatedNotes)

                  }
                 else{
                   console.log('In response false in DeleteNotes')
                 } 
              //notesCtx.funcInitializeNotes()
              history.push('/showNotes')  // after delete call showNotes to see updated notes
            }
          
            deleteNote()
     
     },[])
   
   return (null) 
}

export default DeleteNotes