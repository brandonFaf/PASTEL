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
    <>
      {joinStage ? (
        <JoinGroup user={user} history={history} changeStage={changeStage} />
      ) : (
        <Passcode user={user} history={history} group={group} />
      )}
    </>
  );
};

export default JoinGroupPage;
