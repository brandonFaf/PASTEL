import React, { useEffect, useContext, useState } from "react";
import "./App.css";
import "firebase/auth";
import firebase from "firebase/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { fb } from "./data/firebaseConfig";
import Picker from "./components/Picker";
import { UserContext } from "./contexts/UserContext";
import moment from "moment";
import { loadAllUsers } from "./data/firebaseUserAPI";
import Dashboard from "./components/Dashboard";

const App = () => {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };
  useEffect(() => {
    const unregisterAuthObserver = fb.auth().onAuthStateChanged(user => {
      setUser(user.uid);
    });
    const getAllUsers = async () => {
      const us = await loadAllUsers();
      console.log(us);
      setUsers(us);
    };
    getAllUsers();
    return () => {
      unregisterAuthObserver();
    };
  }, [setUser, setUsers]);
  const getWeek = () => {
    let now = moment();
    return now.subtract(2, "d").week() - 35;
  };
  return (
    <div className="App">
      <div>
        {user ? (
          <>
            {user.username}
            {getWeek()}
            <Dashboard users={users} currentUser={user} />
            <Picker />
          </>
        ) : (
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={fb.auth()} />
        )}
      </div>
    </div>
  );
};

export default App;
