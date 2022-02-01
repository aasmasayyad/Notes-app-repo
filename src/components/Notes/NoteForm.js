import {React,useRef ,Fragment,useContext, useEffect}from 'react'
import classes from './NoteForm.module.css'
import Card from '../Ui/Card';
import NotesContext from '../../store/notes-context';
import useFetch from '../Hooks/useFetch'

import { useHistory } from 'react-router-dom';



const NoteForm = (props) =>{

    const { isLoading, error, loadData   } = useFetch( '', '', '' );   // call useFecth hook

    //console.log('loadData=',loadData)     

    console.log('In Noteform')    
    const notesCtx = useContext(NotesContext)
    const history = useHistory();

    console.log('notesCtx.editMode=' + notesCtx.editMode)
    console.log(notesCtx.editCurrNote.title)
    console.log(notesCtx.notes)
    const  titleInputRef = useRef()
    const  noteInputRef = useRef()

    useEffect(() => {

        console.log('in useeffect of Noteform')
        if(notesCtx.editMode)  
        {
        console.log('in useEffect edit mode true')
        titleInputRef.current.value= notesCtx.editCurrNote.title
        noteInputRef.current.value = notesCtx.editCurrNote.text
        }
        else
        {
            console.log('in useEffect edit mode false') 
            titleInputRef.current.value= ''   //in add mode
            noteInputRef.current.value = ''

        }
    }, [notesCtx.editMode,notesCtx.editCurrNote.title,notesCtx.editCurrNote.text]);




function  submitFormHandler (event) {
    event.preventDefault()
    console.log('submitFormHandler ')
    const enteredTitle = titleInputRef.current.value;
    const enteredNote = noteInputRef.current.value;
   
    let Item_note = ''
    console.log(notesCtx.notes)
    if(notesCtx.editMode===true)
    {
         Item_note = {
            'Item' :
            {
                'note_text' : enteredNote,
                'note_title': enteredTitle,
                'note_id' : notesCtx.editCurrNote.id,
                'user_id' : notesCtx.editCurrNote.user_id,
                'timestamp' : notesCtx.editCurrNote.timestamp
            }
        }
        console.log('in edit mode true in Noteform')

         const editNote= async()=>{

            const response =  await loadData(Item_note,'UPDATE')  //calls Hook function loadData for editing note

        
            if(response.ok===true)
                {
                  console.log('In response true for edit')  
                  console.log(notesCtx.notes)
                 // const updatedNotes= notesCtx.notes.filter((note)=>note.note_id !== props.id);// change the updated notes to include edited note
                  const noteIndex = notesCtx.notes.findIndex((note)=> note.note_id === Item_note.Item.note_id)
                  const  editItem = notesCtx.notes[noteIndex]      
                  const updatedItem = {...editItem, 'note_text': Item_note.Item.note_text, 'note_title': Item_note.Item.note_title }    
                  const updatedNotes = [...notesCtx.notes]
                  updatedNotes[noteIndex]= updatedItem

                  console.log(updatedNotes)
              //    notesCtx.funcInitializeNotes()  //flush all the records in dbnotesCtx
                  notesCtx.funcLoadData(updatedNotes)  // change the context notes array to include edited note
                  history.push('/showNotes');
                }
                else{
                  console.log('In response false in Edit Note')
                } 

         }  //editNote

        editNote();
        loadData(Item_note,'UPDATE')
  
     }  // end (notesCtx.editMode===true)
    else{
        // Add data in DB
         Item_note = {
            'Item' :
            {
                'note_text' : enteredNote,
                'note_title': enteredTitle
            }
        }
       //  AddMyData(Item_note)
       loadData(Item_note,'POST')
    //    history.push('/showNotes');
	
    }  //else

 /**
  * 
  * @param {*} Item 
  * @returns 
  */
    //  async function AddMyData(Item) {
    //        //https://24e78sennf.execute-api.ap-south-1.amazonaws.com/Dev
    //      try{
    //         let rawResponse = await fetch('https://24e78sennf.execute-api.ap-south-1.amazonaws.com/Dev',
    //         {
    //             method: 'POST',
    //             headers: {'content-type': 'application/json', 'Accept': 'application/json',},
    //             body: JSON.stringify(Item_note)
    //         })

    //         const content = await rawResponse.json();
    //         console.log(content)
    //         // notesCtx.funcInitializeNotes();   // to initialize notes to empty array for refresh loading
    //         // notesCtx.startTimestamp=-1;     // to set the start to default -1 for laoding from first record
    //         history.push('/showNotes');
    //      }
    //      catch(err)
    //      {
    //         return null   
    //      }

          
    //     }   //async func AddMyData

    //     async function updateData(Item){ 

    //         console.log('Item=', Item)
    //         console.log(Item.Item.user_id)

    //         try{
    //             let rawResponse = await fetch('https://24e78sennf.execute-api.ap-south-1.amazonaws.com/Dev',
    //             {
    //                 method: 'PATCH',
    //                 headers: {'content-type': 'application/json', 'Accept': 'application/json', 'user_id' : Item.Item.user_id},
    //                 body: JSON.stringify(Item)
    //             })
    
    //             const content = await rawResponse.json();
    //             console.log(content)
    //            // notesCtx.funcInitializeNotes();   // to initialize notes to empty array for refresh loading
    //             //notesCtx.startTimestamp=-1;     // to set the start to default -1 for laoding from first record
            
              
    //          //   notesCtx.funcChangeMode(false) // to change the mode back to false for adding a new note
    //          }
    //          catch(err)
    //          {
    //             console.log('in catch of update note='+ err) 

    //             return null   
    //          }

    //     }  //updateData
           
      
}  // submitFormHandler


 return(
    <Fragment>
        <Card>
          <form  className={classes.form} onSubmit={submitFormHandler}>
            <div className={classes.control}>
                <label htmlFor='title'>Title</label>
                <input type='text' id='title' ref={titleInputRef}    />
            </div>
            <div className={classes.control}>
                <label htmlFor='text'>Note</label>
                <textarea id='text' rows='5' ref={noteInputRef} ></textarea>
            </div>
            <div className={classes.actions}>
                <button type= "Submit" className='btn'>Save Note</button>
            </div>
        </form>
        </Card>
  
 </Fragment>  
    
    )
}

export default NoteForm