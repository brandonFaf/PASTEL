import React, { useEffect, useState, useContext } from "react";
import ActionButton from "./Styled/ActionButton";
import { Link } from "react-router-dom";
import { useTransition } from "react-spring";
import { getGroupsForUser, removeFromGroup } from "../data/firebaseGroupAPI";
import {
  GroupList,
  GroupsSlidingHeader,
  GroupsSlider,
  GroupSliderButtons
} from "./Styled/Groups";
import Group from "./Group";
import { UserContext } from "../contexts/UserContext";
const Groups = ({ user, showGroups, toggleGroups }) => {
  const groupTransitions = useTransition(showGroups, null, {
    from: { transform: "translate3d(-90vh,0,0)" },
    enter: { transform: "translate3d(0vh,0,0)" },
    leave: { transform: "translate3d(-90vh,0,0)" }
  });
  const [groups, setGroups] = useState([]);
  const { setGroup } = useContext(UserContext);
  useEffect(() => {
    const getGroups = async () => {
      const groups = await getGroupsForUser(user.id);
      setGroups(groups);
    };
    if (user) {
      getGroups();
    }
  }, [user]);
  const leaveGroup = async groupId => {
    await removeFromGroup(user.id, groupId);
    const newGroups = groups.filter(g => g.id !== groupId);
    setGroups(newGroups);
    setGroup(newGroups[0]);
  };
  return (
    <>
      {groupTransitions.map(
        ({ item, key, props }) =>
          item && (
            <GroupsSlider key={key} style={props}>
              <GroupsSlidingHeader>
                <span onClick={toggleGroups}>X</span>
                <div>Your Leagues</div>
              </GroupsSlidingHeader>
              <GroupList>
                {groups.map(g => (
                  <Group
                    leaveGroup={leaveGroup}
                    userId={user.id}
                    group={g}
                    key={g.id}
                  />
                ))}
              </GroupList>
              <GroupSliderButtons>
                <ActionButton onClick={toggleGroups}>
                  <Link to="/groups/join">Join</Link>
                </ActionButton>
                <ActionButton onClick={toggleGroups}>
                  <Link to="/groups/create">Create</Link>
                </ActionButton>
              </GroupSliderButtons>
            </GroupsSlider>
          )
      )}
      {/* <GroupList>
            {groups.map(g=>{
              <Group group={g} key={g.id}/>
            })}
      </GroupList> */}
    </>
  );
};

export default Groups;
