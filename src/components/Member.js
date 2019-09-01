import React from 'react';
import ProfilePhoto from './Styled/ProfilePhoto';
import useClickOutsideToggle from './hooks/useClickOutsideToggle';
import {
  Group,
  GroupName,
  GroupDetail,
  LeaveGroupButton,
  LeaveButton,
  GroupPhoto
} from './Styled/Groups';
import { useSpring, animated } from 'react-spring';

const Member = ({ member, leaveGroup, userId }) => {
  const [isDeleting, toggleDeleting, ref] = useClickOutsideToggle();
  const deleteSlideProps = useSpring({
    transform: isDeleting ? 'translateX(-100px)' : 'translateX(0px)'
  });

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
      <Group>
        {userId !== member.id && (
          <LeaveGroupButton onClick={toggleDeleting}>-</LeaveGroupButton>
        )}
        <GroupPhoto>
          <ProfilePhoto
            src={member.photoURL}
            displayName={member.displayName}
          />
        </GroupPhoto>
        <GroupName>{member.displayName}</GroupName>
        <GroupDetail>
          <div>1st</div>
          <div>22Pts</div>
        </GroupDetail>
      </Group>
      <LeaveButton onClick={() => leaveGroup(member.id)}>Leave</LeaveButton>
    </animated.div>
  );
};

export default Member;
