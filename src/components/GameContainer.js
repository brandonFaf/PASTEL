import React from "react";
import moment from "moment";
import "moment-timezone";
import EndGame from "./EndGame";
import Game from "./Game";

const GameContainer = ({ game, save }) => {
  const { visTm, homeTm, selected } = game;
  game.visTmDisplay = visTm && visTm.split(" ").pop();
  game.homeTmDisplay = homeTm && homeTm.split(" ").pop();
  game.visActive = selected === visTm;
  game.homeActive = selected === homeTm;

  const isPastTime = () => {
    const gameStart = moment.tz(
      `${game.date} ${game.time}`,
      "America/New_York"
    );
    return moment().isAfter(gameStart);
  };
  if (isPastTime()) {
    return <EndGame game={game} />;
  }
  return <Game game={game} save={save} />;
};

export default GameContainer;
