import firebase from 'firebase/compat/app';
//const firebaseConfig=(JSON.parse(import.meta.env.VITE_FIREBASECONFIG));
    const firebaseConfig = {

        apiKey: "AIzaSyCAUV9_8cagF2NAuMOvEKSwESsP2VTpfCA",
      
        authDomain: "otplogin-f37a7.firebaseapp.com",
      
        projectId: "otplogin-f37a7",
      
        storageBucket: "otplogin-f37a7.appspot.com",
      
        messagingSenderId: "334738001818",
      
        appId: "1:334738001818:web:73b799da4aca280687f423",
      
        measurementId: "G-H6JS62BV7M"
      
      };
  
     const app= firebase.initializeApp(firebaseConfig);
export {firebase,app};