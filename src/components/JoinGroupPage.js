import styled from 'styled-components/macro';
import React, { useState } from 'react';
import JoinGroup from './JoinGroup';
import Passcode from './Passcode';
import { background } from './Styled/colors';
import { Sticky } from 'react-sticky';
import StickyHeader from './StickyHeader';

const JoinGroupPage = ({ user, history }) => {
  const [joinStage, setJoinStage] = useState(true);
  const [group, setGroup] = useState({});
  const changeStage = g => {
    setJoinStage(!joinStage);
    setGroup(g);
  };

  return (
    <>
      <Sticky>
        {({ style }) => (
          <StickyHeader
            style={{ ...style, opacity: 1 }}
            headerText={'Join A League'}
            close={() => history.goBack()}
          />
        )}
      </Sticky>
      <JGP>
        {joinStage ? (
          <JoinGroup user={user} history={history} changeStage={changeStage} />
        ) : (
          <Passcode
            user={user}
            history={history}
            group={group}
            changeStage={changeStage}
          />
        )}
      </JGP>
    </>
  );
};
const JGP = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${background};
  height: 100vh;
  width: 100vw;
  z-index: 60;
`;

export default JoinGroupPage;
