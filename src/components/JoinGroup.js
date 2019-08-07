import React, { useEffect, useState } from "react";
import Input from "./FloatingInput";
import { getAllGroups, addUserToGroup } from "../data/firebaseGroupAPI";
import Group from "./Group";
const JoinGroup = ({ user, history, changeStage }) => {
  const [groups, setGroups] = useState([]);
  const [currentGroups, setCurrentGroups] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const getGroups = async () => {
      const allGroups = await getAllGroups(user.id);
      const newGroups = allGroups.filter(g => !g.members.includes(user.id));
      setGroups(newGroups);
      setCurrentGroups(newGroups);
    };
    getGroups();
  }, [user]);
  const handleChange = e => {
    setSearch(e.target.value);
    const filteredGroups = groups.filter(g =>
      g.groupName.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    setCurrentGroups(filteredGroups);
  };
  const joinGroup = async (group, isPrivate) => {
    if (isPrivate) {
      changeStage(group);
    } else {
      await addUserToGroup(group.id, user.id);
      history.push("/");
    }
  };
  return (
    <>
      <Input
        autocomplete="off"
        id="searchterm"
        label="Search"
        name="searchterm"
        onChange={handleChange}
        value={search}
      />
      {currentGroups.map(g => (
        <Group joinGroup={joinGroup} userId={user.id} group={g} key={g.id} />
      ))}
    </>
  );
};

export default JoinGroup;
