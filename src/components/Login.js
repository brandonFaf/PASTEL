import React from 'react';
import styled from 'styled-components/macro';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import 'firebase/auth';
import firebase from 'firebase/app';
import Logo from './Styled/Logo';
import { updateUser } from '../data/firebaseUserAPI';

const Container = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
`;
const Login = ({ setHeader }) => {
  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: authResult => {
        let user = authResult.user;
        let isNewUser = authResult.additionalUserInfo.isNewUser;
        if (isNewUser) {
          const { displayName, photoURL, uid, email } = user;
          updateUser(uid, { displayName, photoURL, email });
        }
        return false;
      }
    }
    // signInSuccessUrl: "/profile"
  };
  setHeader('');
  return (
    <Container>
      <Logo />
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </Container>
  );
};

export default Login;
