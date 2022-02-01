   import  { useState, useCallback,useContext } from "react";
   import AuthContext from "../../store/auth-context";
   //import { RequestSigner } from 'aws4';
	// import { Signer } from '@aws-amplify/core';
	// import * as urlLib from 'url';
	import NotesApiService from '../notes-api/notes-api-Interface'
	import { useHistory } from 'react-router-dom';



	
	function useFetch( applyData, page ) {
		
		console.log(' in useFetch Hook')
		const [error, setError] = useState(false);
		const [isLoading, setisLoading] = useState(false)
        const authCtx= useContext(AuthContext)
		const history = useHistory();
	  
		
		const loadData = useCallback( async (Item,apimethod,start) => {
			
			console.log('in function loadData in useFetch Hook')
			// console.log('Page=',page)

			// setisLoading(true);
			// setError(false);
			// console.log("isLoading start", isLoading);
			try {
						
		// 		// alert( start + " " + page)
	                    if(apimethod ==='GET' ){
							            
							            setisLoading(true);
			                            setError(false);
										let savedCredsJson = authCtx.getCredentials();
										const notesapiObj = new NotesApiService(savedCredsJson) 
										const  signedReq = await notesapiObj.getNotes(start) 

								    	console.log('signedReq=',signedReq)

										console.log("Calling API Gateway>>>>>>>>>>>>>>>>>>")

						                if(typeof(signedReq) !== 'undefined')
										{
											        console.log("signedReq exists");
													let response=await fetch(signedReq.url, {
																			method: 'GET',
																		//	mode: 'cors',
																		//	cache: 'no-cache',
																			headers: signedReq.headers
																		//	referrer: 'client'
																		//	body: signedParams.data   // for post
														               })
									   
													console.log("response received");
													console.log('response=',response)
											
												// TODO: check http status code before converting response to JSON
											
													const data  = await response.json()
														
													// console.log('response body=',response.body)
													console.log('data=', data)
													
													console.log("LastEvaluatedKey", data.LastEvaluatedKey)
													console.log(data)
													console.log("calling applyData data>>>>>>>>>>")
													applyData(data)
													
									   }   //  signedReq is not undefined
									   setisLoading(false) 
						}//get
						else if(apimethod==='POST'){
										let savedCredsJson = authCtx.getCredentials();
										const notesapiObj = new NotesApiService(savedCredsJson) 
                                        console.log(Item) 
										const signedReq = await notesapiObj.addNote(Item) ;
                                        console.log('signedReq.data=',signedReq.data)
										let response=await fetch(signedReq.url, {
																	method: 'POST',
																	mode: 'cors',
																	cache: 'no-cache',
																	headers: signedReq.headers,
																	referrer: 'client',
																//	body: signedParams.data   // for post
																	body: (signedReq.data)   // for post
																})

										console.log("response received");
										console.log('response=',response)

									// TODO: check http status code before converting response to JSON

										const data  =  JSON.stringify(response)
											
										// console.log('response body=',response.body)
										console.log('data=', data)
										history.push('/showNotes');
		
						       }
						else if(apimethod ==='UPDATE'){
							    console.log('in Update mode in usefetch')
								let savedCredsJson = authCtx.getCredentials();
								const notesapiObj = new NotesApiService(savedCredsJson)
								console.log(Item) 
								const signedReq = await notesapiObj.updateNote(Item) ;

								console.log('signedReq.data=',signedReq.data)

								let response=await fetch(signedReq.url, {
											method: 'PATCH',
											mode: 'cors',
											cache: 'no-cache',
											headers: signedReq.headers,
											referrer: 'client',
										//	body: signedParams.data   // for post
								        	body: (signedReq.data)   // for post
								})

								console.log("response received");
								console.log('response=',response)
								return response;

							// TODO: check http status code before converting response to JSON

								//const data  = await response.json()
									
								// console.log('response body=',response.body)
							//	console.log('data=', data)
								history.push('/showNotes');

					   }   
				else if(apimethod==='DELETE'){

						let savedCredsJson = authCtx.getCredentials();

						const notesapiObj = new NotesApiService(savedCredsJson) 
						console.log(Item) 
						const signedReq = await notesapiObj.deleteNote(Item.timestamp) ;

						console.log('signedReq.data=',signedReq.data)

						let response=await fetch(signedReq.url, {
																method: 'DELETE',
																mode: 'cors',
																cache: 'no-cache',
																headers: signedReq.headers,
																referrer: 'client',
																	//	body: signedParams.data   // for post
																//		body: (signedReq.data)   // for post
																})

						console.log("response received");
						console.log('response=',response)

						// TODO: check http status code before converting response to JSON

						//	const data  = await response.json()
							
						// console.log('response body=',response.body)
					   //	console.log('data=', data)

							if(response.ok===true)
							{
								console.log('In response ok in usefetch') 
							//	window.location.reload(false);
								//history.replace()
								return response;
							// return
							}
							

			       }  //delete
		                
						
				        // console.log("isLoading end", isLoading);
				} catch(err) {
						setError(err);
						console.log(err)
				}

		}, [page] )   //loadData

		return { isLoading, error, loadData };
	}   

	export default useFetch;