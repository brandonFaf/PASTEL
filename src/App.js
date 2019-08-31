import React, { useEffect, useContext, useState } from 'react';
import { Switch, __RouterContext, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Picker from './components/Picker';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import { updateUser } from './data/firebaseUserAPI';
import firebase from 'firebase/app';
import 'firebase/auth';
import { UserContext } from './contexts/UserContext';
import { StickyContainer, Sticky } from 'react-sticky';
import StickyHeader from './components/StickyHeader';
import Groups from './components/Groups';
import CreateGroup from './components/CreateGroup';
import JoinGroupPage from './components/JoinGroupPage';
import EditProfile from './components/EditProfile';
import { animated, useTransition } from 'react-spring';
const App = () => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [showGroups, setShowGroups] = useState(false);
  const { location } = useContext(__RouterContext);
  console.log('location:', location);
  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setShowGroups(false);
  };
  const toggleGroups = () => {
    setShowGroups(!showGroups);
    setShowProfile(false);
  };
  console.log('user', user);
  const transitions = useTransition(location, location => location.pathname, {
    from: { transform: 'translate3d(0,100vh,0)' },
    enter: { transform: 'translate3d(0,0,0)' },
    leave: { transform: 'translate3d(0,100vh,0)' }
  });

  useEffect(() => {
    console.log('running');
    const setAuth = async u => {
      console.log('u', u);
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
  const [header, setHeader] = useState('');
  return loading ? (
    <div>loading</div>
  ) : (
    <>
      <StickyContainer>
        {transitions.map(({ item, props, key }) => (
          <animated.div
            key={key}
            style={{ position: 'absolute', zIndex: 60, ...props }}
          >
            <Switch location={item}>
              <PrivateRoute
                exact
                path="/groups/create"
                user={user}
                component={CreateGroup}
                setHeader={setHeader}
              />
              <PrivateRoute
                exact
                path="/groups/join"
                user={user}
                component={JoinGroupPage}
                setHeader={setHeader}
              />
            </Switch>
          </animated.div>
        ))}
        <Sticky>
          {({ style }) => (
            <StickyHeader
              user={user}
              style={style}
              headerText={header}
              toggleGroups={toggleGroups}
              toggleProfile={toggleProfile}
            />
          )}
        </Sticky>
        <PrivateRoute
          path="/"
          user={user}
          component={Dashboard}
          setHeader={setHeader}
        />
        <PrivateRoute
          path="/pick"
          user={user}
          component={Picker}
          setHeader={setHeader}
        />
        <PrivateRoute
          exact
          path="/profile"
          user={user}
          component={Profile}
          setHeader={setHeader}
        />
        <PublicRoute
          path="/login"
          user={user}
          component={Login}
          setHeader={setHeader}
        />
      </StickyContainer>

      <EditProfile
        showProfile={showProfile}
        user={user}
        setHeader={setHeader}
        toggleProfile={toggleProfile}
      />

      <Groups showGroups={showGroups} user={user} toggleGroups={toggleGroups} />
    </>
  );
};

export default App;
const PrivateRoute = ({ component: Component, user, loading, ...rest }) => {
  return (
    <>
      <Route
        {...rest}
        render={props =>
          user ? (
            <Component user={user} {...rest} {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
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
  return (
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
                pathname: '/'
              }}
            />
          )
        }
      />
    </>
  );
};
