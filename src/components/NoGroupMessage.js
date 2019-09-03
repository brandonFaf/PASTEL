import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { GroupSliderButtons } from './Styled/Groups';
import ActionButton from './Styled/ActionButton';

const NoGroupMessage = () => {
  return (
    <Container>
      <TextContainer>
        You're ready to play, but you need to join a league first.
      </TextContainer>
      <GroupSliderButtons>
        <Link to="/groups/join">
          <ActionButton>Join a League</ActionButton>
        </Link>
        <Link to="/groups/create">
          <ActionButton>Create a League</ActionButton>
        </Link>
      </GroupSliderButtons>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  justify-content: center;
  grid-template-areas: '.' 'button';
  text-align: center;
  justify-items: center;
  grid-template-rows: 60vh 15vh;
  align-items: center;
  height: calc(100vh - 75px);
`;
const TextContainer = styled.div`
  width: 60vw;
  font-size: 15px;
  line-height: 17px;
  letter-spacing: -0.04em;
`;

export default NoGroupMessage;
