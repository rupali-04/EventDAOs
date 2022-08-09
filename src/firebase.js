// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClkFAXOfxzZCN0eKgnsHQPwuCKGLqmN8Y",
  authDomain: "eventdaos.firebaseapp.com",
  projectId: "eventdaos",
  storageBucket: "eventdaos.appspot.com",
  messagingSenderId: "247931905486",
  appId: "1:247931905486:web:0af6974ae5d5bbe472379f",
  measurementId: "G-LM1FE93Z8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export default app;
