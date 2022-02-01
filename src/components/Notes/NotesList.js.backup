import React from 'react'
import NoteItem from './NoteItem'
import classes from './NotesList.module.css'


const NotesList=(props) =>{

   console.log('In NotesList')


      return (
        <div>
        {props.notes.map((note	) =>{
        console.log('In Notelist Map',note)
        return ( 
                <div   key={note.note_id}   className= {classes.list}>
                <NoteItem   title={note.note_title}
                            //  id={index	}
                            id={note.note_id	}
                            text={note.note_text} 
                            user_id={note.user_id}
                            timestamp={note.timestamp}
                                            
                            />
                </div>
             ) } ) }  //map

      
          </div> 
             
          //

      ) // return
}  //NotesList
   


export default NotesList
