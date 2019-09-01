import React, { useContext } from 'react';
import {
  Group as G,
  GroupName,
  GroupDetail,
  GroupActive,
  GroupPhoto,
  LeaveGroupButton,
  LeaveButton
} from './Styled/Groups';
import { UserContext } from '../contexts/UserContext';
import ProfilePhoto from './Styled/ProfilePhoto';
import { useSpring, animated } from 'react-spring';
import useClickOutsideToggle from './hooks/useClickOutsideToggle';
const Group = ({ group, leaveGroup, userId, toggleGroups, isEdit }) => {
  //make the array of groups in user a map and store score and place there.
  const { setGroup, group: currentGroup } = useContext(UserContext);

  const [isDeleting, toggleDeleting, ref] = useClickOutsideToggle();
  const selectGroup = () => {
    if (!isEdit) {
      setGroup(group);
      toggleGroups();
    }
  };
  const getOrdinal = v => {
    return ['th', 'st', 'nd', 'rd'][
      Math.abs(~[1, 2, 3].indexOf(+(+v).toFixed().substr(-1)))
    ];
  };
  const deleteSlideProps = useSpring({
    transform: isEdit && isDeleting ? 'translateX(-100px)' : 'translateX(0px)'
  });
  const showDeleteButton = () =>
    group.admin !== userId && (
      <LeaveGroupButton onClick={toggleDeleting}>-</LeaveGroupButton>
    );

  const rank = group.ranks ? group.ranks[userId] + 1 : 1;
  return (
    <animated.div
      ref={ref}
      style={{
        ...deleteSlideProps,
        display: 'grid',
        gridAutoFlow: 'column',
        gridTemplateColumns: '100%'
      }}
    >
      <G onClick={selectGroup}>
        {isEdit ? (
          showDeleteButton()
        ) : currentGroup.id === group.id ? (
          <GroupActive />
        ) : (
          <div />
        )}
        <GroupPhoto>
          <ProfilePhoto displayName={group.groupName} />
        </GroupPhoto>
        <GroupName>
          <div>{group.groupName}</div>
        </GroupName>
        <GroupDetail>
          <div>{rank + getOrdinal(rank)}</div>
          <div>22Pts</div>
          <div>{group.members.length}</div>
        </GroupDetail>
      </G>
      <LeaveButton onClick={() => leaveGroup(group.id)}>Leave</LeaveButton>
    </animated.div>
  );
};

export default React.memo(Group);
