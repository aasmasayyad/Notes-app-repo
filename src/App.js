import Notes from './components/Pages/Notes'
// import classes from  './App.module.css';
import { BrowserRouter } from 'react-router-dom';
// import { useContext } from 'react';
import {NotesContextProvider} from './store/notes-context'
// import AuthContext from './store/auth-context';


function App() {

  // const authCtx = useContext(AuthContext)
     
  //   console.log('in App component')  
  //   console.log('authCtx.isLoggedIn=', authCtx.isLoggedIn)
  //   console.log('authCtx.token=', authCtx.token)
    return(

   
        <BrowserRouter>
           {/* <AuthContextProvider>  
            {!authCtx.isLoggedIn &&<AuthForm/>}
           </AuthContextProvider>     */}
            <NotesContextProvider>  
               <Notes/>
            </NotesContextProvider>     
        </BrowserRouter>    
     
        
    )
  
}

export default App;
