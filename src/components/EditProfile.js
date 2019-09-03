import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useTransition } from 'react-spring';
import { SlidingPage, SlidingHeader } from './Styled/SlidingPage';
import Profile from './Profile';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';
import ActionButton from './Styled/ActionButton';
import { GroupSliderButtons } from './Styled/Groups';
const EditProfile = ({
  showProfile,
  toggleProfile,
  user,
  setHeader,
  profileRef
}) => {
  const profileTransitions = useTransition(showProfile, null, {
    from: { transform: 'translate3d(100vw,0,0)' },
    enter: { transform: 'translate3d(15vw,0,0)' },
    leave: { transform: 'translate3d(100vw,0,0)' }
  });
  const { setUser } = useContext(UserContext);

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(x => {
        setUser();
        toggleProfile();
        setHeader('');
      });
  };
  return (
    <>
      {profileTransitions.map(
        ({ item, key, props }) =>
          item && (
            <SlidingPage ref={profileRef} key={key} style={props}>
              <SlidingHeader>
                <div />
                <div>Profile</div>
                <span onClick={toggleProfile}>X</span>
              </SlidingHeader>
              <Profile
                user={user}
                toggle={toggleProfile}
                logout={logout}
                side
              />

              <GroupSliderButtons style={{ marginTop: '10px' }}>
                <Link to="/login">
                  <ActionButton onClick={logout}>Logout</ActionButton>
                </Link>
                <a href="mailto:blitzpickz@gmail.com">
                  <ActionButton hollow>Report An Issue</ActionButton>
                </a>
              </GroupSliderButtons>
            </SlidingPage>
          )
      )}
    </>
  );
};

export default EditProfile;
