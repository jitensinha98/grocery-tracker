import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth" 
import {getFirestore} from "firebase/firestore"

// firebase configuration keys and id used from .env file
const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.EACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId
  };

  const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const db = getFirestore(app)
