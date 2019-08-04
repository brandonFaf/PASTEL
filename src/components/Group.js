import React from "react";
import { Group as G, GroupName, GroupDetail } from "./Styled/Groups";
const Group = ({ group }) => {
  //make the array of groups in user a map and store score and place there.
  console.log(group.members);
  return (
    <G>
      <GroupName>
        <div>{group.groupName}</div>
      </GroupName>
      <GroupDetail>
        <div>3rd Place</div>
        <div>22Pts</div>
        <div>{group.members.length}</div>
      </GroupDetail>
    </G>
  );
};

export default Group;
