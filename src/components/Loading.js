import React from 'react';
import { keyframes } from 'styled-components';
import styled from 'styled-components/macro';
import spinner from '../img/spinnerIcon.png';
const Loading = () => {
  return (
    <Container>
      <Spinner src={spinner} />
    </Container>
  );
};

// Create the keyframes
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const Container = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
// Here we create a component that will rotate everything we pass in over two seconds
const Spinner = styled.img`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;
export default Loading;
