import React, { useContext } from "react";
import {
  Group as G,
  GroupName,
  GroupDetail,
  GroupActive
} from "./Styled/Groups";
import { UserContext } from "../contexts/UserContext";
const Group = ({ group, leaveGroup, joinGroup, userId }) => {
  //make the array of groups in user a map and store score and place there.
  const { setGroup, group: currentGroup } = useContext(UserContext);

  return (
    <G onClick={() => setGroup(group)}>
      {currentGroup.id === group.id ? <GroupActive /> : <div />}
      <GroupName onClick={() => setGroup(group)}>
        <div>{group.groupName}</div>
      </GroupName>
      <GroupDetail>
        <div>3rd Place</div>
        <div>22Pts</div>
        <div>{group.members.length}</div>
        {group.private ? (
          <span role="img" aria-label="private">
            🔐
          </span>
        ) : (
          <span role="img" aria-label="public">
            🌎
          </span>
        )}
        {group.admin !== userId && leaveGroup && (
          <div onClick={() => leaveGroup(group.id)}>XXX</div>
        )}
        {joinGroup && (
          <div onClick={() => joinGroup(group, group.private)}>+</div>
        )}
      </GroupDetail>
    </G>
  );
};

export default React.memo(Group);
