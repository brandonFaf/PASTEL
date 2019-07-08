import React from "react";
import { TeamButton, Game as Container } from "./Styled/Picker";
import moment from "moment";
import "moment-timezone";

const Game = ({ game, save }) => {
  const { visTm, homeTm, selected, winner, id, week, date, time } = game;
  const isPastTime = (date, time) => {
    const gameStart = moment.tz(`${date} ${time}`, "America/New_York");
    return moment().isAfter(gameStart);
  };
  const gameDate = moment(`${date} ${time}`);

  const disabled = isPastTime(date, time);
  let visActive = selected === visTm;
  let homeActive = selected === homeTm;

  let outcome = !winner ? "" : winner === selected ? "correct" : "wrong";
  return (
    <div key={id} className={outcome}>
      <div />
      <Container>
        <TeamButton
          disabled={disabled}
          active={visActive}
          onClick={save(id, visTm, week)}
        >
          {visTm}
        </TeamButton>
        <div>
          <div>{gameDate.format("ddd M/d")}</div>
          <div>{gameDate.format("h:mm A")}</div>
        </div>
        <TeamButton
          disabled={disabled}
          active={homeActive}
          onClick={save(id, homeTm, week)}
        >
          {homeTm}
        </TeamButton>
      </Container>
    </div>
  );
};

export default Game;
