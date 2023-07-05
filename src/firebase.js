import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBNQ0GQofMu8UTYYnoB7iJfy4YVq-xqTZ4",
  authDomain: "chatbot-seiagi.firebaseapp.com",
  databaseURL: "https://chatbot-seiagi.firebaseio.com",
  projectId: "chatbot-seiagi",
  storageBucket: "chatbot-seiagi.appspot.com",
  messagingSenderId: "667638293142",
  appId: "1:667638293142:web:be55e396294d75fea018b7",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export const auth = firebase.auth();
// export const firestore = firebase.firestore();

// export default firebase;

const storage = firebase.storage();

export default storage;
