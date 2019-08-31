import React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { GroupSliderButtons } from './Styled/Groups';
import ActionButton from './Styled/ActionButton';

const NoGroupMessage = () => {
  return (
    <Container>
      <div>
        You are not a part of any leagues.
        <br />
        You're ready to play, but you need to join a league first.
      </div>
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
  align-items: center;
  height: 80vh;
`;

export default NoGroupMessage;
