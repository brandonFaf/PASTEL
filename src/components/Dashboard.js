import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components/macro';
import { loadAllUsers } from '../data/firebaseUserAPI';
import WeekStatus from './Styled/WeekStatus';
import Leaderboard from './Leaderboard';
import MakePicks from './MakePicks';
import getCurrentWeek from '../helpers/getCurrentWeek';
import { UserContext } from '../contexts/UserContext';
import NoGroupMessage from './NoGroupMessage';

const Dashboard = ({ user, setHeader, history }) => {
  const [users, setUsers] = useState([]);
  const [week] = useState(getCurrentWeek());
  const [noGroupMessage, setNoGroupMessage] = useState(false);
  const { group } = useContext(UserContext);
  useEffect(() => {
    const getAllUsers = async () => {
      const us = await loadAllUsers(group.id);
      us.sort((a, b) => b.score - a.score);
      setUsers(us);
    };
    if (!user.hasVisited) {
      history.push('/profile');
    }
    if (group) {
      getAllUsers();
      setNoGroupMessage(false);
      setHeader(group.groupName);
    } else {
      setNoGroupMessage(true);
      setHeader(' ');
    }
  }, [group, history, setHeader, user.hasVisited, user.isNew]);
  const getOrdinal = v => {
    return ['th', 'st', 'nd', 'rd'][
      Math.abs(~[1, 2, 3].indexOf(+(+v).toFixed().substr(-1)))
    ];
  };
  const getRank = () => {
    const rank = users.findIndex(u => u.id === user.id) + 1;
    if (rank === 0) {
      return 'last';
    }
    return (
      <>
        {rank}
        <sup>{getOrdinal(rank)}</sup>
      </>
    );
  };
  if (noGroupMessage) {
    return <NoGroupMessage />;
  }
  return (
    <D>
      <DRel>
        <WeekStatus>
          <div className="week">Week {week}</div>
          <div className="main">
            You're in <strong>{getRank()}</strong> Place,
            <br />
            with{' '}
            <strong>
              {user.score || 0}
              <sup>pts</sup>
            </strong>
          </div>
        </WeekStatus>
        {users.length > 0 && (
          <Leaderboard users={users} user={user} group={group} />
        )}
        <MakePicks
          week={week}
          user={user}
          setHeader={setHeader}
          uid={user.id}
        />
      </DRel>
    </D>
  );
};

const D = styled.div`
  position: absolute;
`;
const DRel = styled.div`
  position: relative;
  width: 100vw;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
`;
export default Dashboard;
