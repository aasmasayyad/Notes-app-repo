import React ,{ useState } from 'react';




const AuthContext = React.createContext({
    token:'',
    googleAuth:'',
    isLoggedIn:false ,
    login: (token) => {},
    logout:() =>{},
    setGoogleAuth1: (gAuth)=>{} ,
    setCredentials:()=>{},
    getCredentials:()=>{}
});

export const AuthContextProvider= (props) =>{

     console.log('In AuthContextProvider')
    const [token,setToken] = useState(null)
    const [googleAuth, setGoogleAuth] = useState();

    const userIsLoggedIn = !!token;    // there is a value in token that means user is logged in

    const loginHandler= (token) =>{
        setToken(token)

    }

    const logoutHandler=()=>{
        console.log('in logoutHandler')
        localStorage.removeItem('id_token');
        localStorage.removeItem('aws');
        setToken(null)
    }

    const assignGoogleAuth=(gAuth) =>{
        setGoogleAuth(gAuth)
    }
    
    const getCredentials=()=> {
        console.log('in getCredentials')
        const creds= localStorage.getItem('aws');
       // console.log(creds)
        return creds;
    }

     	
    const setCredentials= async (id_token) =>{
        try {
            // let options = {
            //     headers: {
            //         Authorization: id_token
            //     }
            // };

            // AP gateway call to fetch the credentials from cognito
            let rawResponse = await fetch('https://24e78sennf.execute-api.ap-south-1.amazonaws.com/Dev/auth',
            {
                method: 'GET',
                headers: {
                            Authorization: id_token
                        }
                
            })

            const credentials = await rawResponse.json();

        //    let endpoint = API_ROOT + STAGE + '/auth';
          //  let credentials = await this.httpClient.get(endpoint, options).toPromise();
          
       //   localStorage.setItem('Name', 'Rahul');
            localStorage.setItem('id_token', id_token);
            localStorage.setItem('aws', JSON.stringify(credentials));
          //  console.log(id_token)
         //   console.log(credentials)
            return;
        } catch(err) {
            localStorage.removeItem('id_token');
            localStorage.removeItem('aws');
            throw err;
        }
    }

    const contextValue={
        token: token,
        googleAuth:googleAuth,
        isLoggedIn : userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler,
        setGoogleAuth1 : assignGoogleAuth,
        setCredentials: setCredentials,
        getCredentials : getCredentials
    }

    return <AuthContext.Provider value={contextValue}> {props.children}</AuthContext.Provider>
}

export default AuthContext;

