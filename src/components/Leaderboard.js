import React from 'react';
import styled from 'styled-components/macro';
import ProfilePhoto from './Styled/ProfilePhoto';
import { highlight } from './Styled/colors';

const Cell = styled.td`
  background-color: #0c1d34;
  padding: 5px;
  vertical-align: middle;
  &.current {
    color: ${highlight};
  }
`;
// const StickyTable = styled(ST)`
//   display: grid;
//   justify-content: center;
// `;
const LBoard = styled.div`
  display: grid;
  margin-top: 40px;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  height: 35vh;
`;

const Leaderboard = ({ users, user, group = {} }) => {
  const weekWinners = group.weekWinners || [];
  const getWins = id => weekWinners.filter(x => x === id).length;
  return (
    <LBoard>
      <div>
        <table>
          <th>
            <th />
            <th />
            <th>Player</th>
            <th>Points</th>
            <th>Wins</th>
          </th>
          {users.map(({ id, displayName, photoURL, score }, i) => {
            let cn = '';
            if (id === user.id) {
              cn = 'current';
            }
            return (
              <tr key={i} className={cn}>
                <Cell>{i + 1}.</Cell>
                <Cell>
                  <ProfilePhoto displayName={displayName} src={photoURL} />
                </Cell>
                <Cell className={cn}>{displayName}</Cell>
                <Cell>{score}</Cell>
                <Cell>{getWins(id)}</Cell>
              </tr>
            );
          })}
        </table>
      </div>
    </LBoard>
  );
};

export default Leaderboard;
