import firebase from 'firebase'
import firestore from 'firebase/firestore'
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAaZKMz0AYID9-w3bu22TVLLCp3BMpqc8Q",
  authDomain: "fit-ninja.firebaseapp.com",
  databaseURL: "https://fit-ninja.firebaseio.com",
  projectId: "fit-ninja",
  storageBucket: "",
  messagingSenderId: "86132830545"
};
const firebaseApp = firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebaseApp.firestore()