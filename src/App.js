import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Picker from "./components/Picker";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import { updateUser } from "./data/firebaseUserAPI";
import firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from "./contexts/UserContext";
import { StickyContainer, Sticky } from "react-sticky";
import Header from "./components/Styled/Header";
import ProfilePhoto from "./components/Styled/ProfilePhoto";
import { useTransition } from "react-spring";
import { ProfileSlidingPage } from "./components/Styled/ProfilePage";

const App = () => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };
  console.log("user", user);

  useEffect(() => {
    const setAuth = async u => {
      console.log("u", u);
      if (!u) {
        // await setUser("bipCNSeypqQh9rfPzx79n4Zw8v03");
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
  const [header, setHeader] = useState("");
  const transitions = useTransition(showProfile, null, {
    from: { transform: "translate3d(100vh,0,0)" },
    enter: { transform: "translate3d(10vh,0,0)" },
    leave: { transform: "translate3d(100vh,0,0)" }
  });
  return (
    <>
      <Router>
        <StickyContainer>
          <Sticky>
            {({ style }) => (
              <Header style={{ ...style, height: "5vh" }}>
                <div className="header-text">{header}</div>
                {user && (
                  <ProfilePhoto
                    onClick={toggleProfile}
                    displayName={user.displayName}
                    src={user.photoURL}
                    size="small"
                  />
                )}
              </Header>
            )}
          </Sticky>
          <PrivateRoute
            exact
            path="/"
            loading={loading}
            user={user}
            component={Dashboard}
            setHeader={setHeader}
          />
          <PrivateRoute
            path="/pick"
            loading={loading}
            user={user}
            component={Picker}
            setHeader={setHeader}
          />
          <PrivateRoute
            exact
            path="/profile"
            loading={loading}
            user={user}
            component={Profile}
            setHeader={setHeader}
          />
        </StickyContainer>
        <PublicRoute
          path="/login"
          loading={loading}
          user={user}
          component={Login}
          setHeader={setHeader}
        />
      </Router>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <ProfileSlidingPage key={key} style={props}>
              <Profile user={user} toggleProfile={toggleProfile} />
            </ProfileSlidingPage>
          )
      )}
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
            <Component user={user} {...rest} {...props} />
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
              <Component user={user} {...rest} {...props} />
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
