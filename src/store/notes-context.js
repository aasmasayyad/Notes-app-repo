import React, {  useState } from 'react'



const NotesContext = React.createContext({
	dbNotesctx: [],           // load data into notes
	error: '',
	editCurrNote: [],  //updated to edit  note
	funcCurrNote: () => { },    // load note to be edited
	editMode: false,
	funcChangeMode: () => { }, //  edit mode to be set
	funcInitializeNotes: () => { },
	start: -1,
	funcSetTimestamp: () =>{}
	
})

export const NotesContextProvider = (props) => {

			console.log('In NotesContextProvider')

		    const [dbNotesctx, setdbNotesctx] = useState([])
			const [currNote, setcurrNote] = useState('')   // note to be edited and deleted
			const [editModeFlag, setModeValue] = useState(false)
			const [start, setstart] = useState(-1)

           function loadData(data){  //load all the current notes in array
			  console.log('In load data in context') 
			  setdbNotesctx(data)
			  
		   }

		   function setTimestamp(value){  //Set the Timestamp Value after load
					console.log('In set Timestamp Value in context') 
					setstart(value)
			
		     }

			function loadCurrNote(note) {  //load curr note for editing and deleting
				console.log('load Current Note')
				setcurrNote(note)    // gets it from note item component
				console.log(note)

				//changeMode(true)

			}

			function changeMode(value) {
				setModeValue(value)
			}

			function initializeNotes() {
				//setdbNotes('')
				setdbNotesctx('')
			}


			const contextValue = {
				notes: dbNotesctx,
				funcLoadData: loadData, 
				editCurrNote: currNote,  //updated to edit  note
				funcCurrNote: loadCurrNote,  // func to initialize editCurrNote for updating
				editMode: editModeFlag,   // flag for edit
				funcChangeMode: changeMode,  // set mode for edit or add
				funcInitializeNotes: initializeNotes,
				funcSetTimestamp : setTimestamp,
				timestamp : start
			}


	return <NotesContext.Provider value={contextValue}>{props.children}</NotesContext.Provider>
} //NotesContextProvider

export default NotesContext;