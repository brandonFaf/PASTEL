import React from "react";

import EndGame from "./EndGame";
import Game from "./Game";
import WeekEndMessage from "./WeekEndMessage";
import { isPastTime } from "../helpers/isPastTime";

const GameContainer = ({ game, save }) => {
  if (!game) {
    return <WeekEndMessage />;
  }
  const { visTm, homeTm, selected } = game;
  game.visTmDisplay = visTm && visTm.split(" ").pop();
  game.homeTmDisplay = homeTm && homeTm.split(" ").pop();
  game.visActive = selected === visTm;
  game.homeActive = selected === homeTm;

  if (isPastTime(game)) {
    return <EndGame game={game} />;
  }
  return <Game game={game} save={save} />;
};

export default GameContainer;
