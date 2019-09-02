import React, { useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../contexts/UserContext';
import { useTransition } from 'react-spring';
import { SlidingPage, SlidingHeader } from './Styled/SlidingPage';
import Profile from './Profile';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';
import ActionButton from './Styled/ActionButton';
import closeX from '../img/close.svg';

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

                <img src={closeX} alt="close" onClick={toggleProfile} />
              </SlidingHeader>
              <Profile
                user={user}
                toggle={toggleProfile}
                logout={logout}
                side
              />
              <LogoutButton to={'/login'}>
                <ActionButton onClick={logout}>Logout</ActionButton>
              </LogoutButton>
            </SlidingPage>
          )
      )}
    </>
  );
};

const LogoutButton = styled(Link)`
  grid-area: button;
  margin-top: 15px;
  align-self: center;
`;
export default EditProfile;
