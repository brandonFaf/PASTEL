import React, { useEffect, useState, useContext } from 'react';
import ActionButton from './Styled/ActionButton';
import { Link } from 'react-router-dom';
import { useTransition } from 'react-spring';
import { getGroupsForUser, removeFromGroup } from '../data/firebaseGroupAPI';
import {
  GroupList,
  GroupsSlidingHeader,
  GroupsSlider,
  GroupSliderButtons
} from './Styled/Groups';
import Group from './Group';
import closeX from '../img/close.svg';
import { UserContext } from '../contexts/UserContext';
import useToggleState from './hooks/useToggleState';
import ManageGroupMembers from './MangeGroupMembers';
const Groups = ({ user, showGroups, toggleGroups, groupsRef }) => {
  const groupTransitions = useTransition(showGroups, null, {
    from: { transform: 'translate3d(-90vh,0,0)' },
    enter: { transform: 'translate3d(0vh,0,0)' },
    leave: () => async next => {
      await next({ transform: 'translate3d(-90vh,0,0)' });
      setEditMode(false);
      setEditGroup();
    }
  });
  const [groups, setGroups] = useState([]);
  const [editGroup, setEditGroup] = useState();
  const [isEdit, setEditMode, toggleEditMode] = useToggleState(false);
  const { group, setGroup } = useContext(UserContext);
  useEffect(() => {
    const getGroups = async () => {
      const groups = await getGroupsForUser(user.id);
      setGroups(groups);
    };
    if (user) {
      getGroups();
    }
  }, [user, group]);
  const leaveGroup = async groupId => {
    await removeFromGroup(user.id, groupId);
    const newGroups = groups.filter(g => g.id !== groupId);
    setGroups(newGroups);
    setGroup(newGroups[0]);
  };
  const clearEdit = () => {
    toggleEditMode();
    setEditGroup();
  };
  return (
    <>
      {groupTransitions.map(
        ({ item, key, props }) =>
          item && (
            <GroupsSlider ref={groupsRef} key={key} style={props}>
              <GroupsSlidingHeader>
                {!isEdit ? (
                  <img src={closeX} alt="close" onClick={toggleGroups} />
                ) : (
                  <div />
                )}
                <div>
                  {isEdit
                    ? editGroup
                      ? `Edit ${editGroup.groupName}`
                      : 'Edit Your Leagues'
                    : 'Your Leagues'}
                </div>
                <span onClick={clearEdit}>{isEdit ? 'Done' : 'Edit'}</span>
              </GroupsSlidingHeader>
              {editGroup ? (
                <>
                  <ManageGroupMembers groupId={editGroup.id} />
                  <GroupSliderButtons>
                    <Link>
                      <ActionButton>INVITE A PLAYER</ActionButton>
                    </Link>
                    <Link>
                      <ActionButton hallow>DELETE THIS LEAGUE</ActionButton>
                    </Link>
                  </GroupSliderButtons>
                </>
              ) : (
                <>
                  <GroupList>
                    {groups
                      .sort((a, b) => (a < b ? -1 : 1))
                      .map(g => (
                        <Group
                          leaveGroup={leaveGroup}
                          userId={user.id}
                          group={g}
                          key={g.id}
                          toggleGroups={toggleGroups}
                          isEdit={isEdit}
                          toggleEditGroup={setEditGroup}
                        />
                      ))}
                  </GroupList>
                  <GroupSliderButtons>
                    <Link to="/groups/join">
                      <ActionButton>Join a League</ActionButton>
                    </Link>
                    <Link to="/groups/create">
                      <ActionButton>Create a League</ActionButton>
                    </Link>
                  </GroupSliderButtons>
                </>
              )}
            </GroupsSlider>
          )
      )}
    </>
  );
};

export default Groups;
