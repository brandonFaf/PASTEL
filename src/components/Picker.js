import React, { useState, useEffect, useContext, useReducer } from "react";
import { loadGames, savePick, loadPicks } from "../data/firebaseGameAPI";
import { UserContext } from "../contexts/UserContext";
import { gamesReducer, gameActions } from "../data/reducers/gamesReducer";
import "./Picker.css";
import moment from "moment";
import "moment-timezone";
const Picker = () => {
  const [state, dispatch] = useReducer(gamesReducer, { games: [] });
  const getCurrentWeek = () => {
    let now = moment();
    const week = now.subtract(2, "d").week() - 35;
    return week > 0 ? week : 1;
  };
  const [week, setWeek] = useState(getCurrentWeek());
  const {
    user: { id: userId, displayName }
  } = useContext(UserContext);
  useEffect(() => {
    const getGames = async () => {
      const games = await loadGames(week);
      dispatch({ type: gameActions.LOAD_GAMES, value: games });
    };
    const getPicks = async () => {
      const { userPicks, gamePicks } = await loadPicks(userId);
      dispatch({ type: gameActions.USER_PICKS_LOADED, value: userPicks });
      dispatch({ type: gameActions.GAME_PICKS_LOADED, value: gamePicks });
    };
    getGames();
    getPicks();
  }, [userId, week]);
  const save = (gameId, teamName, week) => () => {
    savePick({ gameId, teamName, userId, displayName, week });
    dispatch({ type: gameActions.SAVE_PICK, value: { gameId, teamName } });
    console.log("save", teamName);
  };
  const showPicked = game => {
    return (
      <div>
        <span>
          {(game.pickedVisTm.length / game.totalPicks).toFixed(2) * 100}% -{" "}
          {game.pickedVisTm.join(", ")}
        </span>
        <span />
        <span>
          {(game.pickedHomeTm.length / game.totalPicks).toFixed(2) * 100}% -{" "}
          {game.pickedHomeTm.join(", ")}
        </span>
      </div>
    );
  };
  const changeWeek = week => () => {
    setWeek(week);
  };
  const weekNumbers = new Array(17).fill("1");
  const isPastTime = (date, time) => {
    const gameStart = moment.tz(`${date} ${time}`, "America/New_York");
    return moment().isAfter(gameStart);
  };
  return (
    <div>
      <div>
        {weekNumbers.map((x, i) => (
          <button
            key={i}
            className={i + 1 === week ? "active" : ""}
            onClick={changeWeek(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {state.games.map(
        ({
          visTm,
          homeTm,
          selected,
          winner,
          id,
          week,
          date,
          time,
          ...picks
        }) => {
          const displayDate = moment(`${date} ${time}`).format(
            "ddd, MMMM D YYYY h:mm"
          );
          const disabled = isPastTime(date, time);
          let visCN = selected === visTm ? "active" : "";
          let homeCN = selected === homeTm ? "active" : "";

          let outcome = !winner
            ? ""
            : winner === selected
            ? "correct"
            : "wrong";
          return (
            <div key={id} className={outcome}>
              <div>{displayDate}</div>
              <div>
                <button
                  disabled={disabled}
                  className={visCN}
                  onClick={save(id, visTm, week)}
                >
                  {visTm}
                </button>
                {"@"}
                <button
                  disabled={disabled}
                  className={homeCN}
                  onClick={save(id, homeTm, week)}
                >
                  {homeTm}
                </button>
              </div>
              {picks.totalPicks && showPicked(picks)}
            </div>
          );
        }
      )}
    </div>
  );
};

export default Picker;
