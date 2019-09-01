import React, { useEffect, useState, useContext } from 'react';
import { getMembersOfGroup, removeFromGroup } from '../data/firebaseGroupAPI';
import Member from './Member';
import { GroupList } from './Styled/Groups';
import { UserContext } from '../contexts/UserContext';

const MangeGroupMembers = ({ groupId }) => {
  const [members, setMembers] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getMembers = async () => {
      const ms = await getMembersOfGroup(groupId);
      setMembers(ms);
    };
    getMembers();
  }, [groupId]);
  const leaveGroup = async memberId => {
    await removeFromGroup(memberId, groupId);
    const newMembers = members.filter(m => m.id !== memberId);
    setMembers(newMembers);
  };
  return (
    <GroupList>
      {members.map(m => (
        <Member member={m} leaveGroup={leaveGroup} userId={user.id} />
      ))}
    </GroupList>
  );
};

export default MangeGroupMembers;
