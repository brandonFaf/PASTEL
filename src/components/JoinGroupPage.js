import styled from "styled-components/macro";
import React, { useState } from "react";
import JoinGroup from "./JoinGroup";
import Passcode from "./Passcode";
const JoinGroupPage = ({ user, history }) => {
  const [joinStage, setJoinStage] = useState(true);
  const [group, setGroup] = useState({});
  const changeStage = g => {
    setJoinStage(!joinStage);
    setGroup(g);
  };
  return (
    <JGP>
      {joinStage ? (
        <JoinGroup user={user} history={history} changeStage={changeStage} />
      ) : (
        <Passcode user={user} history={history} group={group} />
      )}
    </JGP>
  );
};
const JGP = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default JoinGroupPage;
