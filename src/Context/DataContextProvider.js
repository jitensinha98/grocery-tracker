import React from "react";
import { createContext, useContext } from "react";
import { db } from "../Firebase-Config/firebase-config";
import { updateDoc, doc, getDoc, setDoc, arrayUnion , arrayRemove } from "firebase/firestore";

// context creation
export const user_data_context = createContext({});

// context provider component
const UserDataContextProvider = ({ children }) => {

/*-----------Firestore User Data Manipulation Functions----------- */
  const postData = (uid, data, empty_flag) => {
    if (!empty_flag)
      return updateDoc(doc(db, "user_data", uid), {
        data: arrayUnion(data),
      });
    else {
      let list = [data];
      return setDoc(doc(db, "user_data", uid), { data: list });
    }
  };

  const getData = (uid) => {
    return getDoc(doc(db, "user_data", uid));
  };

  const updateData = (uid, data) => {
    return setDoc(doc(db, "user_data", uid), { data });
  };

  const deleteData = (uid,element) => {
    return updateDoc(doc(db, "user_data", uid), {data: arrayRemove(element)})
  };
  /*--------------------------------------------------------------- */

  // functions and state variables whose context is to passed on wrapped components
  let value = {
    postData,
    getData,
    updateData,
    deleteData
  };

  return (
    <user_data_context.Provider value={value}>
      {children}
    </user_data_context.Provider>
  );
};

// used for context call for accessing context of states and functions
export const useUserData = () => {
  return useContext(user_data_context);
};

export default UserDataContextProvider;
