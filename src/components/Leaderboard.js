import React from 'react';
import styled from 'styled-components/macro';
import ProfilePhoto from './Styled/ProfilePhoto';
import { highlight } from './Styled/colors';

const Row = styled.div`
  display: grid;
  grid-template-columns: 5vw 45px 28vw 10vw;
  grid-auto-flow: row;
  grid-column-gap: 12px;
  align-items: center;
  .current {
    color: ${highlight};
  }
`;

const LBoard = styled.div`
  display: grid;
  grid-auto-flow: row;
  margin-top: 40px;
  font-size: 14px;
  justify-content: center;
  text-align: center;
  align-items: center;
  grid-row-gap: 10px;
  overflow-y: scroll;
  margin: 0 10vw;
  grid-auto-rows: max-content;
`;

const Leaderboard = ({ users, user, group = {} }) => {
  return (
    <LBoard>
      <Row>
        <div />
        <div />
        <div>Player</div>
        <div>Points</div>
      </Row>
      {users.map(({ id, displayName, photoURL, score = {} }, i) => {
        let cn = '';
        if (id === user.id) {
          cn = 'current';
        }
        return (
          <Row key={i} className={cn}>
            <div>{i + 1}.</div>
            <div>
              <ProfilePhoto displayName={displayName} src={photoURL} />
            </div>
            <div className={cn}>{displayName}</div>
            <div>{score[group.id] || 0}</div>
          </Row>
        );
      })}
    </LBoard>
  );
};

export default Leaderboard;
