import React from "react";
import {
  TeamButton,
  Game as Container,
  BarVis,
  BarHome,
  MiddleButton,
  ProgressBar
} from "./Styled/Picker";
import moment from "moment";
import "moment-timezone";
const Game = ({ game, save }) => {
  console.log("game");
  const { visTm, homeTm, selected, winner, id, week, date, time } = game;
  const isPastTime = (date, time) => {
    const gameStart = moment.tz(`${date} ${time}`, "America/New_York");
    return moment().isAfter(gameStart);
  };
  const gameDate = moment(`${date} ${time}`);
  const visTmDisplay = visTm && visTm.split(" ").pop();
  const homeTmDisplay = homeTm && homeTm.split(" ").pop();
  const disabled = isPastTime(date, time);
  const visActive = selected === visTm;
  const homeActive = selected === homeTm;
  const visPer =
    disabled && game.pickedVisTm
      ? Math.floor(Math.random() * 100) //(game.pickedVisTm.length / game.totalPicks).toFixed(2) * 100
      : visActive
      ? 33
      : 100;
  const homePer =
    disabled && game.pickedHomeTm
      ? 100 - visPer //(game.pickedHomeTm.length / game.totalPicks).toFixed(2) * 100
      : homeActive
      ? 33
      : 67;
  const outcome = !winner ? "" : winner === selected ? "RIGHT" : "WRONG";
  const getMiddle = () => {
    if (outcome === "RIGHT") {
      return (
        <>
          {/* <img src={check} alt="right" /> */}
          <div>&#10004;</div>
          <div>RIGHT</div>
        </>
      );
    } else if (outcome === "WRONG") {
      return (
        <>
          {/* <img src={x} alt="wrong" /> */}
          <div>X</div>
          <div>WRONG</div>
        </>
      );
    } else {
      return (
        <>
          <div>{gameDate.format("ddd M/D")}</div>
          <div>{gameDate.format("h:mm A")}</div>
        </>
      );
    }
  };
  const gameBlock = (
    <div className="container">
      <Container>
        <TeamButton
          disabled={disabled}
          active={visActive}
          onClick={save(id, visTm, week)}
        >
          {visTmDisplay}
        </TeamButton>
        <MiddleButton>{getMiddle()}</MiddleButton>
        <TeamButton
          disabled={disabled}
          active={homeActive}
          onClick={save(id, homeTm, week)}
        >
          {homeTmDisplay}
        </TeamButton>
      </Container>
    </div>
  );
  return (
    <ProgressBar outcome={outcome}>
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
