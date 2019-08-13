import React, { useContext } from "react";
import {
  Group as G,
  GroupName,
  GroupDetail,
  GroupActive,
  GroupPhoto
} from "./Styled/Groups";
import { UserContext } from "../contexts/UserContext";
import ProfilePhoto from "./Styled/ProfilePhoto";
const Group = ({ group, leaveGroup, userId }) => {
  //make the array of groups in user a map and store score and place there.
  const { setGroup, group: currentGroup } = useContext(UserContext);

  return (
    <G onClick={() => setGroup(group)}>
      {currentGroup.id === group.id ? <GroupActive /> : <div />}
      <GroupPhoto>
        <ProfilePhoto displayName={group.groupName} />
      </GroupPhoto>
      <GroupName onClick={() => setGroup(group)}>
        <div>{group.groupName}</div>
      </GroupName>
      <GroupDetail>
        <div>3rd Place</div>
        <div>22Pts</div>
        <div>{group.members.length}</div>
        {group.admin !== userId && leaveGroup && (
          <div onClick={() => leaveGroup(group.id)}>XXX</div>
        )}
      </GroupDetail>
    </G>
  );
};

export default React.memo(Group);
