// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "kreact-ai.firebaseapp.com",
  projectId: "kreact-ai",
  storageBucket: "kreact-ai.appspot.com",
  messagingSenderId: "522865173846",
  appId: "1:522865173846:web:dae7226a7e7fccefdc22f7",
  measurementId: "G-EH3Q12SQTY"
};

// Initialize Firebase


let isInit = false;

let app
const firebaseInit = () => {
  console.log('firebase initializing', isInit);
  if(isInit){
    return app;
  }else{
    app = initializeApp(firebaseConfig);
    isInit = true;
    return app;
  }
}

export default firebaseInit