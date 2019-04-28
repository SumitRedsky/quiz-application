import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBs3KmsM3Yhfy8kDTPbkEDvwfFIiQAJU9s",
  authDomain: "template02-ad26c.firebaseapp.com",
  databaseURL: "https://template02-ad26c.firebaseio.com",
  projectId: "template02-ad26c",
  storageBucket: "template02-ad26c.appspot.com",
  messagingSenderId: "705723515704"
};
const fb = firebase.initializeApp(config);

export default fb;
