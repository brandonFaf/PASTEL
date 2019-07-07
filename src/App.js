import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Picker from "./components/Picker";
import Dashboard from "./components/Dashboard";
// import Profile from "./components/Profile";
import { updateUser } from "./data/firebaseUserAPI";
import firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from "./contexts/UserContext";

const App = () => {
  // const logout = () => {
  //   firebase
  //     .auth()
  //     .signOut()
  //     .then(x => {
  //       setUser();
  //     });
  // };
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  console.log("user", user);

  useEffect(() => {
    const setAuth = async u => {
      console.log("u", u);
      if (!u) {
        await setUser(null);
        setLoading(false);
        return;
      }
      ///need to call get user here:
      //only time update user is when the user is new signing up, which i stil lneed ot firue that out cuase this aint working
      const { displayName, photoURL, uid, email } = u;
      if (u.metadata.creationTime === u.metadata.lastSignInTime) {
        updateUser(uid, { displayName, photoURL, email });
      }
      await setUser(uid);
      setLoading(false);
    };
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(u => {
      setAuth(u);
    });

    return () => {
      unregisterAuthObserver();
    };
  }, [setUser]);
  return (
    <>
      <Router>
        <PrivateRoute
          exact
          path="/"
          loading={loading}
          user={user}
          component={Dashboard}
        />
        <PrivateRoute
          path="/pick"
          loading={loading}
          user={user}
          component={Picker}
        />
        <PublicRoute
          path="/login"
          loading={loading}
          user={user}
          component={Login}
        />
      </Router>
    </>
  );
};

export default App;
const PrivateRoute = ({ component: Component, user, loading, ...rest }) => {
  return loading ? (
    <div>loading</div>
  ) : (
    <>
      <Route
        {...rest}
        render={props =>
          user ? (
            <Component user={user} {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    </>
  );
};
const PublicRoute = ({ component: Component, user, loading, ...rest }) => {
  return loading ? (
    <div>loading</div>
  ) : (
    <>
      <Route
        {...rest}
        render={props =>
          !user ? (
            <>
              <Component user={user} {...props} />
            </>
          ) : (
            <Redirect
              to={{
                pathname: "/"
              }}
            />
          )
        }
      />
    </>
  );
};
