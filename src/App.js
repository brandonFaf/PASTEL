import React, { useEffect, useContext, useState } from 'react';
import { Switch, __RouterContext, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Picker from './components/Picker';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import firebase from 'firebase/app';
import 'firebase/auth';
import { UserContext } from './contexts/UserContext';
import { StickyContainer, Sticky } from 'react-sticky';
import StickyHeader from './components/StickyHeader';
import Groups from './components/Groups';
import CreateGroup from './components/CreateGroup';
import JoinGroupPage from './components/JoinGroupPage';
import EditProfile from './components/EditProfile';
import DeleteGroup from './components/DeleteGroup';
import { animated, useTransition } from 'react-spring';
import useClickOutsideToggle from './components/hooks/useClickOutsideToggle';
import Loading from './components/Loading';

const App = () => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [showProfile, toggleProfile, profileRef] = useClickOutsideToggle();
  const [showGroups, toggleGroups, groupsRef] = useClickOutsideToggle();

  const { location } = useContext(__RouterContext);
  console.log('user', user);
  const transitions = useTransition(location, location => location.pathname, {
    from: { transform: 'translate3d(0,75vh,0)' },
    enter: { transform: 'translate3d(0,0,0)' },
    leave: { transform: 'translate3d(0,75vh,0)' },
    config: { duration: 300 }
  });
  useEffect(() => {
    console.log('running');
    const setAuth = async u => {
      console.log('u', u);
      if (!u) {
        setLoading(false);
        return;
      }

      await setUser(u.uid);
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
    <Loading />
  ) : (
    <>
      <StickyContainer>
        {transitions.map(({ item, props, key }) => (
          <animated.div
            key={key}
            style={{ position: 'absolute', zIndex: 80, ...props }}
          >
            <Switch location={item}>
              <PrivateRoute
                exact
                path="/groups/create"
                user={user}
                component={CreateGroup}
              />
              <PrivateRoute
                exact
                path="/groups/join"
                user={user}
                component={JoinGroupPage}
              />
              <PrivateRoute
                exact
                path="/groups/delete"
                user={user}
                toggleGroups={toggleGroups}
                component={DeleteGroup}
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
        {transitions.map(({ item, props, key }) => (
          <animated.div
            key={key}
            style={{ position: 'absolute', zIndex: 60, ...props }}
          >
            <Switch location={item}>
              <PrivateRoute
                path="/pick"
                user={user}
                component={Picker}
                setHeader={setHeader}
              />
            </Switch>
          </animated.div>
        ))}
        <Switch>
          <PublicRoute
            path="/login"
            user={user}
            component={Login}
            setHeader={setHeader}
          />
          <PrivateRoute
            exact
            path="/profile"
            user={user}
            component={Profile}
            setHeader={setHeader}
          />
          <PrivateRoute
            path="/"
            user={user}
            component={Dashboard}
            setHeader={setHeader}
          />
        </Switch>
      </StickyContainer>
      <EditProfile
        showProfile={showProfile}
        user={user}
        setHeader={setHeader}
        toggleProfile={toggleProfile}
        profileRef={profileRef}
      />
      <Groups
        showGroups={showGroups}
        groupsRef={groupsRef}
        user={user}
        toggleGroups={toggleGroups}
      />
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
