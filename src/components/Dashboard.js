import React, { useEffect, useState } from "react";
import { loadAllUsers } from "../data/firebaseUserAPI";
import WeekStatus from "./Styled/WeekStatus";
import Leaderboard from "./Leaderboard";
import MakePicks from "./MakePicks";
import getCurrentWeek from "../helpers/getCurrentWeek";
const Dashboard = ({ user, setHeader }) => {
  const [users, setUsers] = useState([]);
  const [week] = useState(getCurrentWeek());
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
      return "last";
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
        <div className="week">Week {week}</div>
        <div className="main">
          You're in <strong>{getRank()}</strong> Place,
          <br />
          with{" "}
          <strong>
            {user.score || 0}
            <sup>pts</sup>
          </strong>
        </div>
      </WeekStatus>
      <Leaderboard users={users} user={user} />
      <MakePicks week={week} uid={user.id} />
    </>
  );
};

export default Dashboard;
