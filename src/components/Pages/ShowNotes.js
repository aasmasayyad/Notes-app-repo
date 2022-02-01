import React, { Fragment,useRef, useState,useContext} from 'react'
import { useEffect , useCallback} from 'react'
import NoteItem from '../Notes/NoteItem'
// import classes from '../Notes/NoteItem.module.css'
import classes from './ShowNotes.module.css'
import useFetch from '../Hooks/useFetch'
import LoadingSpinner from '../Ui/LoadingSpinner'
import NotesContext from '../../store/notes-context'
// import Backdrop from '@mui/material/Backdrop ';
// import CircularProgress from '@mui/material/CircularProgress';
// import { makeStyles } from '@mui/material';
//import {BounceLoader,BeatLoader} from 'react-spinners'


const ShowNotes = () => {
	
	console.log('In Show Notes')
    const NotesCtx = useContext(NotesContext)
	const [page, setPage] = useState(0);
	//const [dbNotes, setdbNotes] = useState([])
	//const [start, setstart] = useState(-1)
    
   // NotesCtx.funcInitializeNotes();
		
			function isIterable (value) {
				return Symbol.iterator in Object(value);
			}

			const transformTasks = useCallback ( (body) => {
				console.log('In transformTasks')
				
				// setdbNotes( (prev) => {
				// 	if (isIterable(body.Items))
				// 		return [...prev, ...body.Items];
				// 	else 
				// 		return prev;
						
				// })
                console.log('NotesCtx in transformTasks=',NotesCtx.notes)
               
				NotesCtx.funcLoadData((prev) => {
					if (isIterable(body.Items))
						return [...prev, ...body.Items];
					else 
						return prev;
						
				})
				// alert("break")
				if (typeof(body.LastEvaluatedKey) !== 'undefined') {            
					//setstart(body.LastEvaluatedKey.timestamp);
					NotesCtx.funcSetTimestamp(body.LastEvaluatedKey.timestamp) 
					console.log('timestamp=', body.LastEvaluatedKey.timestamp, 'start=', NotesCtx.timestamp)
				
				} else {
					console.log('setting timstamp = 0')
					NotesCtx.funcSetTimestamp(0) 
				//	setstart( 0 )
				}
			}, [] );  //it should not be re-created if comp re-renders
                                                                              //start is replaced by timestamp
	    const { isLoading, error, loadData } = useFetch( transformTasks, page);   // call useFecth hook
	
	//	 loadData('','GET')
	//	console.log('notes=', dbNotes)
		console.log('isLoading=',isLoading)
		console.log('NotesCtx=',NotesCtx.notes)

		const load = () => {
			setPage( (page) => page + 1 );
		}


	const observer = useRef (
		new IntersectionObserver(
		  entries => {
			const first = entries[0];
			// console.log(first);
			if (first.isIntersecting) {
				// setPage( (page) => page + 1 );
				load();
			}
		  },
		  { threshold: 0.5 }
		)
	);
	const [element, setElement] = useState(null);
	
	// useEffect(() => {
	// 	loader.current = load;
	// }, [load]);

	useEffect(() => {
		const currentElement = element;
		const currentObserver = observer.current;
	
		if (currentElement) {
		  currentObserver.observe(currentElement);
		}
	
		return () => {
		  if (currentElement) {
			currentObserver.unobserve(currentElement);
		  }
		};
	  }, [element]);
    
	  console.log('page=',page)

	useEffect(() => {
		console.log('In (useeffect of showNotes) before  calling load data')
		console.log(NotesCtx.editMode)
		
	//	console.log('start in useeffect=',start)
       // if (NotesCtx.timestamp!==0)

		loadData('','GET',NotesCtx.timestamp);
			

		// return () => {                 // cleanup Function for next run of useffect
        //     NotesCtx.funcInitializeNotes();
        // }
	
	
	}, [page]);	
  
	let NotesList
	// if( dbNotes.length !== 0 ) {nnn
	// 	// console.log('notes.length',dbNotes )
	// 	NotesList = dbNotes.map( (note) => {
	// 		return ( 
	// 			<div key={note.note_id} className={classes.list}>
	// 				<NoteItem title={note.note_title}
	// 					id={note.note_id}
	// 					text={note.note_text} 
	// 					user_id={note.user_id}
	// 					timestamp={note.timestamp}					
	// 				/>
	// 			</div>
	// 		 )
	// 	} )  //map 
	// }
	//  else {
	// 	NotesList = <li >No Notes found</li>	
	// }

	if( NotesCtx.notes.length !== 0 ) {
		// console.log('notes.length',dbNotes )
		NotesList = NotesCtx.notes.map( (note) => {
			return ( 
				<div key={note.note_id} className={classes.list}>
					<NoteItem title={note.note_title}
						id={note.note_id}
						text={note.note_text} 
						user_id={note.user_id}
						timestamp={note.timestamp}					
					/>
				</div>
			 )
		} )  //map 
	}
	 else {
		NotesList = <li >No Notes found</li>	
	}
	

          
	return(
		<Fragment> 
		
			{
				 !isLoading &&  
				<div>
					{
						NotesList
						 
					}
				</div>
			}
			{
				isLoading &&  <div className='centered'><LoadingSpinner />  </div>
				
				// <p>Loading...</p>

			}
			{/* {
				error && 
				<p>Error!</p>
			} */}
			{
				isLoading===false 
				&& 
				NotesCtx.timestamp !== 0
				&&
				<div 
					ref={setElement} 
					style={{height: 250, width: '100%', background: '#0000FF'}}
				>
						{/* <button onClick={load}>Load more...</button> */}
				</div>
			}
		</Fragment>
	)
}

export default ShowNotes