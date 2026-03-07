/* =========================================
   Firebase Configuration
   Lighthouse Property Inspections
   ========================================= */

firebase.initializeApp({
  apiKey: 'AIzaSyApPpQMqxY2VAq37pb2h_bMsza9vEFSWvM',
  authDomain: 'lighthouse-7aca6.firebaseapp.com',
  projectId: 'lighthouse-7aca6'
});

window.db = firebase.firestore();
window.auth = firebase.auth();
