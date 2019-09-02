import styled from 'styled-components/macro';
import React, { useState } from 'react';
import JoinGroup from './JoinGroup';
import Passcode from './Passcode';
import { background } from './Styled/colors';
import { Sticky } from 'react-sticky';
import StickyHeader from './StickyHeader';
import ConfirmPage from './ConfirmPage';
import useToggleState from './hooks/useToggleState';

const JoinGroupPage = ({ user, history }) => {
  const [joinStage, setJoinStage] = useState(true);
  const [confirmStage, , toggleConfirmStage] = useToggleState(false);
  const [group, setGroup] = useState({});
  const goToConfirm = group => {
    setGroup(group);
    toggleConfirmStage();
  };
  const changeStage = g => {
    setJoinStage(!joinStage);
    setGroup(g);
  };
  const getSearchStage = () =>
    joinStage ? (
      <JoinGroup
        user={user}
        goToConfirm={goToConfirm}
        changeStage={changeStage}
      />
    ) : (
      <Passcode
        user={user}
        group={group}
        changeStage={changeStage}
        goToConfirm={goToConfirm}
      />
    );

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
        {confirmStage ? (
          <ConfirmPage
            user={user}
            group={group}
            history={history}
            toggleConfirm={toggleConfirmStage}
          />
        ) : (
          getSearchStage()
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
