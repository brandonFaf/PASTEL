import React, { useState } from "react";
import {
  TeamButton,
  Game as Container,
  BarVis,
  BarHome,
  MiddleButton,
  ProgressBar
} from "./Styled/Picker";
import WhoPicked from "./WhoPicked";
const EndGame = ({ game }) => {
  const {
    visActive,
    homeActive,
    visTmDisplay,
    homeTmDisplay,
    winner,
    selected,
    pickedHomeTm,
    pickedVisTm
  } = game;
  const visPer = game.pickedVisTm
    ? Math.floor(Math.random() * 100) //(game.pickedVisTm.length / game.totalPicks).toFixed(2) * 100
    : 100;
  const homePer = game.pickedHomeTm
    ? 100 - visPer //(game.pickedHomeTm.length / game.totalPicks).toFixed(2) * 100
    : 67;
  const outcome = !winner ? "" : winner === selected ? "RIGHT" : "WRONG";
  const [showUsers, setShowUsers] = useState(true);
  const pickData = {
    homePer,
    visPer,
    homeActive,
    visActive,
    pickedHomeTm,
    pickedVisTm
  };
  const toggleUsers = () => {
    setShowUsers(!showUsers);
  };
  const getMiddle = () => {
    if (outcome === "RIGHT") {
      return (
        <>
          <div>&#10004;</div>
          <div>RIGHT</div>
        </>
      );
    } else
      return (
        <>
          <div>X</div>
          <div>WRONG</div>
        </>
      );
  };
  const gameBlock = (
    <div className="container">
      <Container>
        <TeamButton disabled active={visActive}>
          {visTmDisplay}
        </TeamButton>
        <MiddleButton>{getMiddle()}</MiddleButton>
        <TeamButton disabled active={homeActive}>
          {homeTmDisplay}
        </TeamButton>
      </Container>
    </div>
  );
  return (
    <>
      <ProgressBar outcome={outcome} onClick={toggleUsers}>
        <BarVis active={visActive} percent={visPer}>
          {gameBlock}
        </BarVis>
        <BarHome active={homeActive} percent={homePer}>
          {gameBlock}
        </BarHome>
      </ProgressBar>
      <WhoPicked showUsers={showUsers} data={pickData} />
    </>
  );
};

export default EndGame;
