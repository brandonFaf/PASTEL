import React, { useEffect, useContext } from "react";
import "./App.css";
import "firebase/auth";
import firebase from "firebase/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { fb } from "./data/firebaseConfig";
import Picker from "./components/Picker";
import { UserContext } from "./contexts/UserContext";
import moment from "moment";

const App: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
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
    const unregisterAuthObserver = fb.auth().onAuthStateChanged((user: any) => {
      setUser(user.uid);
    });
    return () => {
      unregisterAuthObserver();
    };
  }, [setUser]);
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
