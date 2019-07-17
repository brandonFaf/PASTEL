import React, { useEffect, useState } from "react";
import { loadAllUsers } from "../data/firebaseUserAPI";
import WeekStatus from "./Styled/WeekStatus";
import Leaderboard from "./Leaderboard";
import MakePicks from "./MakePicks";
import getCurrentWeek from "../helpers/getCurrentWeek";
const Dashboard = ({ user, setHeader }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const us = await loadAllUsers();
      setUsers(us);
    };
    setHeader("Dashboard");
    getAllUsers();
  }, [setHeader]);
  const getOrdinal = v => {
    return ["th", "st", "nd", "rd"][
      Math.abs(~[1, 2, 3].indexOf(+(+v).toFixed().substr(-1)))
    ];
  };
  const getRank = () => {
    const rank = users.findIndex(u => u.id === user.id) + 1;
    if (rank === 0) {
      return;
    }
    return (
      <>
        {rank}
        <sup>{getOrdinal(rank)}</sup>
      </>
    );
  };

  return (
    <>
      <WeekStatus>
        <div className="week">Week {getCurrentWeek()}</div>
        <div className="main">
          You're in <strong>{getRank()}</strong> Place,
          <br />
          with{" "}
          <strong>
            {user.score}
            <sup>pts</sup>
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
