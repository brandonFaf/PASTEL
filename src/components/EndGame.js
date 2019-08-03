import React, { useState } from "react";
import moment from "moment";
import "moment-timezone";
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
    pickedVisTm,
    homeScore,
    visScore,
    date,
    time
  } = game;
  const gameDate = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm:ss");
  const visPer =
    game.pickedVisTm && game.totalPicks
      ? (game.pickedVisTm.length / game.totalPicks).toFixed(2) * 100
      : 100;
  const homePer =
    game.pickedHomeTm && game.totalPicks
      ? (game.pickedHomeTm.length / game.totalPicks).toFixed(2) * 100
      : 67;
  const outcome = !winner ? "" : winner === selected ? "RIGHT" : "WRONG";
  const [showUsers, setShowUsers] = useState(false);
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
    if (!outcome) {
      return (
        <>
          <div>{gameDate.format("ddd M/D")}</div>
          <div>{gameDate.format("h:mm A")}</div>
        </>
      );
    }
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
          <>
            <div>{visTmDisplay}</div>
            <div>{visScore}</div>
          </>
        </TeamButton>
        <MiddleButton>{getMiddle()}</MiddleButton>
        <TeamButton disabled active={homeActive}>
          <>
            <div>{homeTmDisplay}</div>
            <div>{homeScore}</div>
          </>
        </TeamButton>
      </Container>
    </div>
  );
  return (
    <>
      <ProgressBar onClick={toggleUsers}>
        <BarVis
          outcome={outcome}
          active={visActive || visActive === homeActive}
          percent={visPer}
        >
          {gameBlock}
        </BarVis>
        <BarHome
          outcome={outcome}
          active={homeActive || visActive === homeActive}
          percent={homePer}
        >
          {gameBlock}
        </BarHome>
      </ProgressBar>
      <WhoPicked showUsers={showUsers} data={pickData} />
    </>
  );
};

export default EndGame;
