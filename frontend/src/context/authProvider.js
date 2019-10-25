import React, { useEffect, useState } from "react";

import { app } from "../services/firebase";
import { Loading } from "../components/Loading"

export const AuthContext = React.createContext();
const auth = app.auth();
const Db = app.firestore();



export const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(undefined);


  useEffect(() => {

    async function getuserdata(uid) {
      const docRef = await Db.collection("Users").doc(uid).get();

      return docRef.data();

    }
    const unsubscribe = auth.onAuthStateChanged((currUser) => {


      if (currUser !== null) {
        getuserdata(currUser.uid).then(user => {
          setCurrentUser({ ...currUser, displayName: user.name, techs: user.techs });
        })

      } else {
        setCurrentUser(currUser);
      }

    });

    return (() => {
      unsubscribe();
    })
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {currentUser === undefined ? <Loading overlay /> : children}
    </AuthContext.Provider>
  );
};
