// import classes from './Notes.module.css'
import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from '../Layout/Layout'
import ShowNotes from './ShowNotes'
import AuthForm from '../AuthPage/authForm';
import AddNotes from './AddNotes'
import HomePage from './HomePage'
import NoteForm from '../Notes/NoteForm';
import DeleteNotes from '../Pages/DeleteNotes'
// import {AuthContextProvider} from '../../store/auth-context'


const Notes=() =>{

return(  
    
      <Switch>
        <Layout>
          <Route path='/' exact>
            <HomePage />
          </Route>
          <Route path='/showNotes'>
            <ShowNotes />
           </Route> 
         <Route path='/deleteNotes'>
           <DeleteNotes/>
          </Route>  
         <Route path='/addNotes'>
            <AddNotes /> 
          </Route>  
          <Route path='/updateNote'>
            <NoteForm/>
          </Route>   
            {/* <Route path='/Logout'>
              <Logout /> 
              history.replace('./Login')
            </Route>    */}
            <Route path='/Login'>
               <AuthForm/>
            </Route> 
            <Route path='*'>
                <Redirect to='/'/>  
            </Route>
          
          </Layout> 
       </Switch>
    
    )
}

export default Notes;


