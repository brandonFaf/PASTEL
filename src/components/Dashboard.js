import React from "react";

const Dashboard = ({ users, currentUser }) => {
  return (
    <div>
      {users.map(({ id, displayName, photoURL, score }, i) => {
        let cn = "";
        if (id === currentUser.id) {
          cn = "current";
        }
        return (
          <div key={i} className={cn}>
            {photoURL && (
              <img
                src={photoURL}
                alt="profile"
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "90px"
                }}
              />
            )}
            {`${i + 1}. ${displayName} ${score} `}
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
