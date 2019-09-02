import React, { useEffect, useState } from 'react';
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

const Button = styled(Link)`
  margin-bottom: -20px;
  z-index: 10;
`;

const MakePicks = ({ week, uid }) => {
  const [game, setGame] = useState({});
  const [ratio, setRatio] = useState(['', '']);
  const save = () => {};
  useEffect(() => {
    const getFirstGame = async () => {
      const g = await loadFirstGame(week);
      setGame(g);
    };
    const getRatio = async () => {
      const picks = await getNumberOfPicks(uid, week);
      const totalGames = getTotalGames(week);
      setRatio([picks, totalGames]);
    };
    getFirstGame();
    getRatio();
  }, [uid, week]);

  return (
    <Footer>
      <Button to="/pick">
        <ActionButton>
          <img src={chevron} alt="chevron" />
          <div>MAKE YOUR PICKS</div>
          <div>{`${ratio[0]}/${ratio[1]}`}</div>
        </ActionButton>
      </Button>

      <GC>
        <GameContainer style={{ paddingLeft: '5vw' }} game={game} save={save} />
      </GC>
    </Footer>
  );
};

export default MakePicks;
