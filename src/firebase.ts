import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBSpYBZ-mFyWAtTHpLYDWkToJNIdczVCIU",
  authDomain: "whenso-login-f6a8f.firebaseapp.com",
  projectId: "whenso-login-f6a8f",
  storageBucket: "whenso-login-f6a8f.appspot.com",
  messagingSenderId: "583574091136",
  appId: "1:583574091136:web:f84653a4e827d47ee6bd65",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
export { auth };
