import React, { useEffect, useState } from "react";
import { loadAllUsers } from "../data/firebaseUserAPI";
import Header from "./Styled/Header";
import WeekStatus from "./Styled/WeekStatus";
import Leaderboard from "./Leaderboard";
import ProfilePhoto from "./Styled/ProfilePhoto";
import MakePicks from "./MakePicks";
const Dashboard = ({ user }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const us = await loadAllUsers();
      setUsers(us);
    };
    getAllUsers();
  }, []);
  return (
    <>
      <Header>
        <div>Dashboard</div>
        <ProfilePhoto src={user.photoURL} alt="profile" />
      </Header>
      <WeekStatus>
        <div className="week">Week 3</div>
        <div className="main">
          You're in{" "}
          <strong>
            2<sup>nd</sup>
          </strong>{" "}
          Place,
          <br />
          with{" "}
          <strong>
            56<sup>pts</sup>
          </strong>
        </div>
        <div className="streak">
          No <strong>Week Streak</strong> Selected
        </div>
      </WeekStatus>
      <Leaderboard users={users} user={user} />
      <MakePicks />
    </>
  );
};

export default Dashboard;
