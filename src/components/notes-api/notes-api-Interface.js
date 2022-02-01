
import {  Signer } from '@aws-amplify/core';
import * as urlLib from 'url';
// import AuthContext from "../../store/auth-context";


export default class NotesApiService {
   
    // options;
    savedCredsJson;

    constructor( savedCredsJson) {
            this.savedCredsJson = savedCredsJson
    }

    async getsignedrequest(path = '/', method = '', body = '') 
    {
           	
              // const host = new URL(API_ROOT);
                    
              try {
                      let signedReq;
                    //  console.log('savedCredsJson=',this.savedCredsJson)
                     if(this.savedCredsJson) {
        
                            // the urlLib code is adopted from Amplify Rest Client
                            const { ...parsedUrl } = urlLib.parse(path, true, true);
                         //   console.log('parsedUrl=',parsedUrl)
                            let formattedUrl = urlLib.format({ 
                                ...parsedUrl,
                                query: { ...parsedUrl.query }
                            });
        
                            // set your AWS region and service here
                            const serviceInfo = {
                                region: 'ap-south-1', service: 'execute-api'
                            }
        
                            let savedCreds = JSON.parse( this.savedCredsJson);  //converted to object
                            let creds = {
                                access_key : savedCreds.Credentials.AccessKeyId,
                                secret_key: savedCreds.Credentials.SecretKey,
                                session_token: savedCreds.Credentials.SessionToken
                            };   
                               
                            let params;

                                  if(method==='GET')
                                  {
                                        params = {
                                                    headers: { 
                                                                'Accept': 'application/json',
                                                                'Content-Type': 'application/json',
                                                                'app_user_id' :savedCreds.IdentityId,
                                                                'app_user_name' :savedCreds.user_name 
                                                            },
                                                // data: JSON.stringify({  //post or patch
                                                // 'd': body
                                                // }),
                                                    method: method,
                                                    url: formattedUrl
                                        } //get
                                 }
                                 
                                 if(method==='POST')
                                 {
                                       console.log('body in signedrequest=',body  )
                                       params = {
                                            headers:   { 
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json',
                                                        'app_user_id' :savedCreds.IdentityId,
                                                        'app_user_name' :savedCreds.user_name 
                                                        },
                                               //post or patch
                                                   data: JSON.stringify(body ),
                                                   method: method,
                                                   url: formattedUrl
                                                } //get
                                }
                                // cred object keys must stay the same so that 
                                // Signer.sign function can access the keys
                                if(method==='PATCH')
                                {
                                      console.log('body in signedrequest=',body  )
                                      params = {
                                           headers:   { 
                                                       'Accept': 'application/json',
                                                       'Content-Type': 'application/json',
                                                       'app_user_id' :savedCreds.IdentityId,
                                                       'app_user_name' :savedCreds.user_name 
                                                       },
                                              //post or patch
                                                  data: JSON.stringify(body ),
                                                  method: method,
                                                  url: formattedUrl
                                               } //get
                                }
                                if(method==='DELETE')
                                {
                                      console.log('body in signedrequest=',body  )
                                      params = {
                                           headers:   { 
                                                       'Accept': 'application/json',
                                                       'Content-Type': 'application/json',
                                                       'app_user_id' :savedCreds.IdentityId,
                                                       'app_user_name' :savedCreds.user_name 
                                                       },
                                              //post or patch
                                                //  data: JSON.stringify(body ),
                                                  method: method,
                                                  url: formattedUrl
                                               } //get
                                }
        
                                // Signer.sign takes care of all other steps of Signature V4
                                signedReq = await Signer.sign(params, creds, serviceInfo);
                              //  console.log('signedReq=', signedReq)  
                                // Promise.resolve(signedReq);
                                return (signedReq)
                                
                
                     }  // if savedcreds exist
                 } catch (error) {
                     // do nothing
                     console.log(error);
                 }
        /////////////////////////////////Signing ENDS//////////////////////////
    }

    addNote=async(item) =>{
      
        let path= 'https://24e78sennf.execute-api.ap-south-1.amazonaws.com/Dev' 
        // let endpoint = API_ROOT + path;
        
        // let itemData;
        // itemData = {
        //     content: item.content,
        //     cat: item.cat
        // };

        // if(item.title != "") {
        //     itemData.title = item.title;
        // }

        // let reqBody = {
        //     Item: itemData
        // };

      //  let reqBody = JSON.parse(item)
        console.log('item in addNote=', item)
        let signedReq = await this.getsignedrequest(path,'POST',item);
             
        return signedReq;
    }


    updateNote=async(item) =>
     {
        // let path = STAGE + '/note';
        // let endpoint = API_ROOT + path;
        let path= 'https://24e78sennf.execute-api.ap-south-1.amazonaws.com/Dev' 
        
        // let itemData;

        // itemData = {
        //     content: item.content,
        //     cat: item.cat,
        //     timestamp: parseInt(item.timestamp),
        //     note_id: item.note_id
        // };

        // if (item.title != "") {
        //     itemData.title = item.title;
        // }

        // let reqBody = {
        //     Item: itemData
        // };
        let signedReq = await this.getsignedrequest(path,'PATCH',item);
             
        return signedReq;
        // this.setOptions(path, 'PATCH', JSON.stringify(reqBody));
        // return this.httpClient.patch(endpoint, reqBody, this.options);
    }

    deleteNote = async(timestamp)=> {
            console.log('timestamp=',timestamp)
            let API_ROOT= 'https://24e78sennf.execute-api.ap-south-1.amazonaws.com/Dev' 
          //  let STAGE = 'Dev'
            let path = API_ROOT + '/note/t/' + timestamp;
            let signedReq = await this.getsignedrequest(path, 'DELETE');
             
            return signedReq;

    //     let path = STAGE + '/note/t/' + timestamp;
    //     let endpoint = API_ROOT + path;
    //     this.setOptions(path, 'DELETE');
    //     return this.httpClient.delete(endpoint, this.options);
      }

  getNotes= async(start)=>{
            
            // alert( start + " " + page)
            if(start === 0) {
                console.log('in Start===0  return')
                return;
            }
            let url= 'https://24e78sennf.execute-api.ap-south-1.amazonaws.com/Dev' 
            let path= url + '?limit=5';
            if (start > 0) {
                console.log('in start > 0  for path')
                 path += '&start=' + start;
            }
        
            let signedReq = await this.getsignedrequest(path, 'GET');
             
            return signedReq;
                   
        
       }  //getnotes
  

}  //class ends