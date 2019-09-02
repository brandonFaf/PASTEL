import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { UserContext } from '../contexts/UserContext';
import { Sticky } from 'react-sticky';
import StickyHeader from './StickyHeader';
import { background } from './Styled/colors';
import { GroupList, GroupSliderButtons } from './Styled/Groups';
import Member from './Member';
import ActionButton from './Styled/ActionButton';
import { HighlightText } from './Styled/HighlightText';
import { Link } from 'react-router-dom';
import { deleteGroup as dg } from '../data/firebaseGroupAPI';

const DeleteGroup = ({ history, location }) => {
  const { members, groupName, groupId } = location.state;
  const { allGroups, setAllGroups, setGroup } = useContext(UserContext);
  const deleteGroup = () => {
    dg(members, groupId);
    const newGroups = allGroups.filter(g => g.id !== groupId);
    setAllGroups(newGroups);
    setGroup(newGroups[0]);
    history.push('/');
  };
  return (
    <>
      <Sticky>
        {({ style }) => (
          <StickyHeader
            style={{ ...style, opacity: 1 }}
            headerText={'Delete This League'}
            close={() => history.push('/')}
          />
        )}
      </Sticky>
      <JGP>
        <HighlightText>{groupName} MEMBERS</HighlightText>
        <GroupList>
          {members.map(m => (
            <Member member={m} key={m.id} />
          ))}
        </GroupList>
        <GroupSliderButtons>
          <ActionButton red onClick={deleteGroup}>
            DELETE THIS LEAGUE
          </ActionButton>

          <Link to="/">
            <ActionButton hollow>CANCEL</ActionButton>
          </Link>
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

export default DeleteGroup;
