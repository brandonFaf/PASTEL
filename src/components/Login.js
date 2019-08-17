import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import 'firebase/auth';
import firebase from 'firebase/app';
import Logo from './Styled/Logo';

const Login = ({ setHeader }) => {
  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ]
    // signInSuccessUrl: "/profile"
  };
  setHeader('');
  return (
    <>
      <Logo />
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </>
  );
};

export default Login;
