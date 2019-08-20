import React, { useContext } from 'react';
import {
  Group as G,
  GroupName,
  GroupDetail,
  GroupActive,
  GroupPhoto
} from './Styled/Groups';
import { UserContext } from '../contexts/UserContext';
import ProfilePhoto from './Styled/ProfilePhoto';
const AllGroup = ({ toggleGroups }) => {
  const group = { id: 'all', groupName: 'ALL' };
  const { setGroup, group: currentGroup } = useContext(UserContext);
  const selectGroup = () => {
    setGroup(group);
    toggleGroups();
  };

  return (
    <G onClick={selectGroup}>
      {currentGroup.id === group.id ? <GroupActive /> : <div />}
      <GroupPhoto>
        <ProfilePhoto displayName={'AL L L'} />
      </GroupPhoto>
      <GroupName>
        <div>ALL</div>
      </GroupName>
      <GroupDetail>
        <div>Any picks made will copy to all other groups</div>
      </GroupDetail>
    </G>
  );
};

export default React.memo(AllGroup);
