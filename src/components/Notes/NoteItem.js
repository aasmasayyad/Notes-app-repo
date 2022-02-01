import React,{useContext, useEffect} from 'react'
import classes from './NoteItem.module.css'
import NotesContext from '../../store/notes-context'
import { useHistory } from 'react-router-dom';
import useFetch from '../Hooks/useFetch'

const NoteItem=(props) =>{

  const history = useHistory();

  const notesCtx = useContext(NotesContext)

  const { isLoading, error, loadData   } = useFetch( '', '', '' );   // call useFecth hook
  // notesCtx.funcCurrNote(props)   // initializes the note to be deleted in context variable
  
  const delbuttonHandler= ()=>{
    
            console.log('In delbuttonHandler in noteItem')
            console.log('props in deletebuttonhdl=',props)
          //   notesCtx.funcCurrNote(props)   // initializes the note to be deleted in context variable
           
          //  history.push('/deleteNotes')    //calls delete note 

            // const { isLoading, error, loadData   } = useFetch( '', '', '' );   // call useFecth hook
        
            // const notesCtx= useContext(NotesContext)  
        
          //  console.log(notesCtx.editCurrNote)  //note which is to be deleted in retrieved from this
         
            console.log(notesCtx.notes)   //complete note which is before delete
            // console.log('(useeffect) in deleteNotes')

            async function deleteNote()
              {
                 
                const response =  await loadData(props,'DELETE')  //calls Hook function loadData for deleting
                if(response.ok===true)
                    {
                      const updatedNotes= notesCtx.notes.filter((note)=>note.note_id !== props.id);
                      console.log(updatedNotes)
                      notesCtx.funcInitializeNotes()  //flush all the records in dbnotesCtx
                      notesCtx.funcLoadData(updatedNotes)
  
                    }
                    else{
                      console.log('In response false in DeleteNotes')
                    } 
                //notesCtx.funcInitializeNotes()
               // history.push('/showNotes')  // after delete call showNotes to see updated notes
              }
            
              deleteNote()
        
    }//delbuttonHandler
    
        

        //deleteMyData()
    //  function deleteMyData() {

    //    console.log('deleteMyData')
    //    fetch('https://24e78sennf.execute-api.ap-south-1.amazonaws.com/Dev/note/t/' + props.timestamp,
    //         {
    //           method: 'DELETE',
    //           headers: {
    //                     // 'content-type': 'application/json', 
    //                      'Accept': 'application/json', 
    //                      'user_id': props.user_id,
    //                    //  'Access-Control-Allow-Origin': '*',
    //                   //   'Access-Control-Request-Headers' : '*'
    //                   },
        
    //         }).then((response)=>//fetch
    //                {  
    //                     console.log(response.ok)

    //                     if(response.ok===true)
    //                     {
    //                       console.log('after delete and call loadCurrData')
    //                       // notesCtx.funcInitializeNotes();
    //                       // notesCtx.startTimestamp=-1;
    //                    // notesCtx.loadCurrData()  call this func in useHTTPhook
    //                    // either call usefetch hook or call ./ShowNotes 
    //                       history.push('/showNotes')
    //                     }
    //                })  //then

   
    //     } //deleteMyData 
   
     // console.log('In NoteItem delbuttonHandler ')  
               
 
   function editHandler()
    {
       console.log('in editHandler')
       console.log(props.text)
     //  notesCtx.funcInitializeNotes()  //flush all the records in dbnotesCtx
       notesCtx.funcCurrNote(props)  // initializes the note to be edited in context variable
       notesCtx.funcChangeMode(true)  // to change the mode to true for editing a  note
       history.push('/updateNote'); 
    }
 

    return (
      // key={props.id}
     
          <div className={classes.item} > 
            <figure onClick={editHandler}>
              <h2 className={classes.title}>{props.title}</h2>
              <blockquote className={classes.note}>
                <p>{props.text}</p>
              </blockquote>
            </figure>
            <button className={classes.button} onClick={delbuttonHandler}> Delete </button>
          </div>   
          
      )
  }   


export default NoteItem