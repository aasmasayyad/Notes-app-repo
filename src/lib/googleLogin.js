  
export const loadGoogleScript = () => {
    // console.log('in loadGoogleScript')
    //loads the Google JavaScript Library
    (function () {

        console.log('in loadGoogleScript')
        const id = 'google-js';
        const src = 'https://apis.google.com/js/platform.js';
        
        //we have at least one script (React)
        const firstJs = document.getElementsByTagName('script')[0];

        console.log(document.getElementById(id))
        
        // //prevent script from loading twice
        // if (document.getElementById(id)) {
        //     console.log(document.getElementById(id))
        //     console.log('In prevent script from loading twice')
        //     return; }
        const js = document.createElement('script'); 
        js.id = id;
        js.src = src;
        js.onload = window.onGoogleScriptLoad; 
        console.log('after js.onload')
        firstJs.parentNode.insertBefore(js, firstJs);
    }());    
    
}


