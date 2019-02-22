import * as firebase from "firebase";
// import firebaseApp from '@firebase/app';
// import '@firebase/auth
var config = {
    apiKey: "AIzaSyCut-7_IyDFbu3WedehyLLc56RS0CUVESc",
    authDomain: "mobdb-98215.firebaseapp.com",
    databaseURL: "https://mobdb-98215.firebaseio.com",
    projectId: "mobdb-98215",
    storageBucket: "mobdb-98215.appspot.com",
    messagingSenderId: "138796014905"
};
// if (!firebase.apps.length) {
//     firebase.initializeApp(config);
// }
// firebase.initializeApp(config);
export const firebaseApp = firebase.initializeApp(config);