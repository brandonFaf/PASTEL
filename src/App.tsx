import React, { useEffect, useContext } from "react";
import "./App.css";
import "firebase/auth";
import firebase from "firebase/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { fb } from "./data/firebaseConfig";
import Picker from "./components/Picker";
import { UserContext } from "./contexts/UserContext";

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
  return (
    <div className="App">
      <div>
        {user ? (
          <>
            {user.username}
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
