import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components/macro';
import { UserContext } from '../contexts/UserContext';
import { addUserToGroup } from '../data/firebaseGroupAPI';
import { background } from './Styled/colors';
import { GroupList, GroupSliderButtons } from './Styled/Groups';
import Member from './Member';
import ActionButton from './Styled/ActionButton';
import { HighlightText } from './Styled/HighlightText';
import { getMembersOfGroup } from '../data/firebaseGroupAPI';

const ConfirmPage = ({ user, group, history, toggleConfirm }) => {
  const { id: groupId, groupName } = group;
  console.log('group:', group);
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const getMembers = async () => {
      const ms = await getMembersOfGroup(groupId);
      setMembers(ms);
      console.log('ms:', ms);
    };
    getMembers();
  }, [groupId]);

  const { setGroup } = useContext(UserContext);
  const joinGroup = async group => {
    await addUserToGroup(group.id, user.id);
    setGroup(group);
    history.push('/');
  };
  return (
    <>
      <JGP>
        <HighlightText>{groupName} MEMBERS</HighlightText>
        <GroupList>
          {members.map(m => (
            <Member member={m} key={m.id} />
          ))}
        </GroupList>
        <GroupSliderButtons>
          <ActionButton red onClick={joinGroup}>
            JOIN THIS LEAGUE
          </ActionButton>

          <ActionButton hallow onClick={toggleConfirm}>
            CANCEL
          </ActionButton>
        </GroupSliderButtons>
      </JGP>
    </>
  );
};
const JGP = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  justify-items: center;
  background-color: ${background};
  height: 100vh;
  width: 100vw;
  z-index: 60;
  overflow: hidden;
  grid-template-columns: 100%;
  grid-template-rows: 10vh 50vh 15vh;
  grid-template-areas: 'text' 'guts' 'button';
`;

export default ConfirmPage;
