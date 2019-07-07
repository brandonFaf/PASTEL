import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadAllUsers } from "../data/firebaseUserAPI";
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
      <div>
        <Link to="/pick">Pick</Link>
      </div>
      <div>
        {users.map(({ id, displayName, photoURL, score }, i) => {
          let cn = "";
          if (id === user.id) {
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
    </>
  );
};

export default Dashboard;
