import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { auth } from "../Firebase-Config/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";

// context creation
export const user_auth_context = createContext({});

// context provider component
const UserAuthContextProvider = ({ children }) => {

  // State variables used for setting logged user and Load state
  const [user, Setuser] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = 
    onAuthStateChanged(auth, (CurrentUser) => {
      Setuser(CurrentUser);
      setIsLoading(false);
    });

    // useEffect cleaning
    return (() => {
      unsubscribe()
    })
  }, []);

  /*-----------Firestore User Authentication Functions----------- */
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const passwordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  /*----------------------------------------------------------- */

  // functions and state variables whose context is to passed on wrapped components
  let value = {
    register,
    login,
    logout,
    passwordReset,
    user,
    isLoading,
  };

  return (
    <user_auth_context.Provider value={value}>
      {children}
    </user_auth_context.Provider>
  );
};

// used for context call for accessing context of states and functions
export const useUserAuth = () => {
  return useContext(user_auth_context);
};

export default UserAuthContextProvider;
