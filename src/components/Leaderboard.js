import React from "react";

import { StickyTable, Row, Cell as C } from "react-sticky-table";
import "react-sticky-table/dist/react-sticky-table.css";
import styled from "styled-components";
import ProfilePhoto from "./Styled/ProfilePhoto";

const Cell = styled(C)`
  background-color: #0c1d34;
  padding: 5px;
  vertical-align: middle;
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

const Leaderboard = ({ users, user }) => {
  return (
    <LBoard>
      <div>
        <StickyTable>
          <Row>
            <Cell />
            <Cell />
            <Cell>Player</Cell>
            <Cell>Points</Cell>
            <Cell>Win</Cell>
            <Cell>Streak</Cell>
          </Row>
          {users.map(({ id, displayName, photoURL, score }, i) => {
            let cn = "";
            if (id === user.id) {
              cn = "current";
            }
            return (
              <Row key={i} className={cn}>
                <Cell>{i + 1}.</Cell>
                <Cell>
                  {photoURL && <ProfilePhoto src={photoURL} alt="profile" />}
                </Cell>
                <Cell>{displayName}</Cell>
                <Cell>{score}</Cell>
                <Cell>1</Cell>
                <Cell>???</Cell>
              </Row>
            );
          })}
        </StickyTable>
      </div>
    </LBoard>
  );
};

export default Leaderboard;
