import classes from './MainNavigation.module.css'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../../store/auth-context'


const MainNavigation=() =>{
 
   
  const history=useHistory()

  const authCtx = useContext(AuthContext)

  const isLoggedIn= authCtx.isLoggedIn

  const logOutfunc = () => {
    (async() => {
    console.log('in logOut function')
    await authCtx.googleAuth.signOut();
    authCtx.logout()
    history.push('./Login')
 
    })();}
   
    return(
       <header className={classes.header}>     
        <div className={classes.logo}> NotesApp Server</div>
          <nav className={classes.nav}>
            <ul>
              {!isLoggedIn &&   <li>
                    <NavLink to='/Login' activeClassName={classes.active}>
                            Login
                    </NavLink>
                </li> }
               {isLoggedIn && 
                 <li>
                    <NavLink to='/showNotes' activeClassName={classes.active}>
                            Show Notes
                    </NavLink>
                </li>}
                 {isLoggedIn && 
                 <li>
                    <NavLink to='/addNotes' activeClassName={classes.active}>
                            Add Notes
                    </NavLink>
                </li>}
                { 
                    isLoggedIn && 
                     <li> 
                      <button onClick={logOutfunc}>Logout</button>
                   </li> 
                }
                  
            </ul>
          </nav>
        </header> 
      )

  }


export default MainNavigation