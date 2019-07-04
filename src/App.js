import React, { useEffect, useContext, useState } from "react";
import "./App.css";
import "firebase/auth";
import firebase from "firebase/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { fb } from "./data/firebaseConfig";
import Picker from "./components/Picker";
import { UserContext } from "./contexts/UserContext";
import moment from "moment";
import { loadAllUsers, updateUser } from "./data/firebaseUserAPI";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";

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
      if (!user) return;
      ///need to call get user here:
      //only time update user is when the user is new signing up, which i stil lneed ot firue that out cuase this aint working
      const { displayName, photoURL, uid, email } = user;
      if (user.metadata.creationTime === user.metadata.lastSignInTime) {
        updateUser(uid, { displayName, photoURL, email });
      }
      setUser(uid);
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
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(x => {
        setUser();
      });
  };
  return (
    <div className="App">
      <div>
        {user ? (
          <>
            <button onClick={logout}>logout</button>
            {user.username}
            {getWeek()}
            <Profile currentUser={user} />
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
