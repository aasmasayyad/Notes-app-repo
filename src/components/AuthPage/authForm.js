import React, { useContext ,useEffect} from 'react'
import classes from  './authForm.module.css';
import { loadGoogleScript } from '../../lib/googleLogin';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';
const googleClientId ='35305532222-cnvjthvchd311ubmfimrbdioa5t70g11.apps.googleusercontent.com'  ;

const AuthForm = ()=>{
        const history = useHistory()
        console.log('in the  Authform')
        const authCtx = useContext(AuthContext)
        const isLoggedIn = authCtx.isLoggedIn

  const onSuccess = (googleUser) => {
            console.log('onSuccess')
            const idToken = googleUser.getAuthResponse().id_token; //idtoken
          //  console.log('id_token= ',idToken)
            authCtx.setCredentials(idToken)
            authCtx.login(idToken)
            history.replace('/')

   };
  
  const onFailure = () => {
        console.log('onFailure')
        authCtx.logout()
  }
  
  
  const renderSigninButton = (_gapi) => {
    console.log('renderSigninButton')
    _gapi.signin2.render('google-signin', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure 
    });
  }
  
  
  useEffect(() => {
      
    console.log('in useEffect of authform')
           //window.gapi is available at this point
            window.onGoogleScriptLoad = () => {
            console.log('window.onGoogleScriptLoad')
            const _gapi = window.gapi;
            _gapi.load('auth2', () => {
                  (async () => { 
                    const _googleAuth = await _gapi.auth2.init({
                    client_id: googleClientId
                    });
                    authCtx.setGoogleAuth1(_googleAuth);
                    renderSigninButton(_gapi);
                   })();
                   });
                }
           //ensure everything is set before loading the script
            loadGoogleScript();
    
     },[]);  //useeffect
  

  

  
    return (
      
          <div className={classes.appHeader}>
            <header className={classes.signIn}>
              <div className = {classes.capital}>
                  Welcome to the Serverless Notes App
              </div>
              <div className={classes.small}>
                Sign in with your Google Account to continue 
              </div>
               {!isLoggedIn &&
                    <div id="google-signin"></div>
               }
              </header>
             </div>  
            
        );
    

}

export default AuthForm

