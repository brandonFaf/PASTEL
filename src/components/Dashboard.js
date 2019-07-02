import React from "react";

const Dashboard = ({ users, currentUser }) => {
  return (
    <div>
      {users.map(({ username, score }, i) => {
        let cn = "";
        if (username == currentUser.username) {
          cn = "current";
        }
        return <div className={cn}>{`${i + 1}. ${username} ${score} `}</div>;
      })}
    </div>
  );
};

export default Dashboard;
