import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import ActionButton from './Styled/ActionButton';
import Footer from './Styled/Footer';
import chevron from '../img/Chevron.png';
import {
  loadFirstGame,
  getTotalGames,
  getNumberOfPicks
} from '../data/firebaseGameAPI';
import { GameContainer as GC } from './PickSkeleton';
import GameContainer from './GameContainer';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import useRouter from './hooks/useRouter';
const Button = styled(Link)`
  margin-bottom: -20px;
  z-index: 10;
`;

const MakePicks = ({ week, uid }) => {
  const [game, setGame] = useState({});
  const { group, pickCount } = useContext(UserContext);
  const [picks, setPicks] = useState(pickCount);
  const [totalGames, setTotalGames] = useState(getTotalGames(week));
  const { location } = useRouter();
  const save = () => {};
  useEffect(() => {
    const getFirstGame = async () => {
      const g = await loadFirstGame(week);
      setGame(g);
    };
    const getPickCount = async () => {
      const p = await getNumberOfPicks(uid, week, group.id);
      setPicks(p);
      setTotalGames(getTotalGames(week));
    };
    if (location.pathname === '/') {
      getFirstGame();
      getPickCount();
    }
  }, [group.id, location.pathname, uid, week]);

  return (
    <Footer>
      <Button to="/pick">
        <ActionButton>
          <img src={chevron} alt="chevron" />
          <div>MAKE YOUR PICKS</div>
          <div>{`${picks}/${totalGames}`}</div>
        </ActionButton>
      </Button>

      <GC>
        <GameContainer style={{ paddingLeft: '5vw' }} game={game} save={save} />
      </GC>
    </Footer>
  );
};

export default MakePicks;
