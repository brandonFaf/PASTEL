import React from 'react';
import {
  TeamButton,
  Game as Container,
  BarVis,
  BarHome,
  MiddleButton,
  ProgressBar
} from './Styled/Picker';
import moment from 'moment';
import 'moment-timezone';
const Game = ({ game, save }) => {
  const {
    visActive,
    homeActive,
    visTm,
    homeTm,
    id,
    week,
    date,
    time,
    visTmDisplay,
    homeTmDisplay
  } = game;

  const estDate = moment.tz(
    `${date} ${time}`,
    'YYYY-MM-DD HH:mm:ss',
    'America/New_York'
  );
  const gameDate = estDate.tz(moment.tz.guess());
  const visPer = visActive ? 33 : 100; //(game.pickedVisTm.length / game.totalPicks).toFixed(2) * 100
  const homePer = homeActive ? 33 : 67;

  const gameBlock = (
    <div className="container">
      <Container>
        <TeamButton
          active={visActive}
          onClick={save(id, visTm, week, date, time)}
        >
          {visTmDisplay}
        </TeamButton>
        <MiddleButton>
          <div>{gameDate.format('ddd M/D')}</div>
          <div>{gameDate.format('h:mm A')}</div>
        </MiddleButton>
        <TeamButton
          active={homeActive}
          onClick={save(id, homeTm, week, date, time)}
        >
          {homeTmDisplay}
        </TeamButton>
      </Container>
    </div>
  );
  return (
    <ProgressBar>
      <BarVis active={visActive} percent={visPer}>
        {gameBlock}
      </BarVis>
      <BarHome active={homeActive} percent={homePer}>
        {gameBlock}
      </BarHome>
    </ProgressBar>
  );
};

export default Game;
