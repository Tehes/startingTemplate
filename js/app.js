/* --------------------------------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------------------------------*/

/* --------------------------------------------------------------------------------------------------
Variables
---------------------------------------------------------------------------------------------------*/


/* --------------------------------------------------------------------------------------------------
functions
---------------------------------------------------------------------------------------------------*/

function init() {
    // The following touchstart event listener was used as a workaround for older iOS devices
    // to prevent a 300ms delay in touch interactions. It is likely not necessary anymore
    // on modern devices and browsers, especially in Progressive Web Apps.
    // If you experience issues with touch interactions, you can uncomment it again.
    // document.addEventListener("touchstart", function() {}, false);
}

/* --------------------------------------------------------------------------------------------------
public members, exposed with return statement
---------------------------------------------------------------------------------------------------*/
window.app = {
    init
};

app.init();

/* --------------------------------------------------------------------------------------------------
Service Worker registration. Only use, when you want a PWA
---------------------------------------------------------------------------------------------------*/
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function() {
//         navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
//             console.log('Service Worker registered with scope:', registration.scope);
//         }).catch(function(error) {
//             console.log('Service Worker registration failed:', error);
//         });
//     });
// }