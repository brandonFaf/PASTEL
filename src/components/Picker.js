import React, { useState, useEffect, useReducer } from "react";
import { loadGames, savePick, loadPicks } from "../data/firebaseGameAPI";
import { gamesReducer, gameActions } from "../data/reducers/gamesReducer";
import moment from "moment";
import "moment-timezone";
import { TeamButton, PickPage, Game } from "./Styled/Picker";
import Header from "./Styled/Header";
import ProfilePhoto from "./Styled/ProfilePhoto";
const Picker = ({ user }) => {
  const [state, dispatch] = useReducer(gamesReducer, { games: [] });
  const getCurrentWeek = () => {
    let now = moment();
    const week = now.subtract(2, "d").week() - 35;
    return week > 0 ? week : 1;
  };
  const [week, setWeek] = useState(getCurrentWeek());
  const { id: userId, displayName } = user;
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
    <>
      <Header>
        <div>Make Your Picks</div>
        <ProfilePhoto src={user.photoURL} alt="profile" />
      </Header>
      <PickPage>
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
            const gameDate = moment(`${date} ${time}`);

            const disabled = isPastTime(date, time);
            let visActive = selected === visTm;
            let homeActive = selected === homeTm;

            let outcome = !winner
              ? ""
              : winner === selected
              ? "correct"
              : "wrong";
            return (
              <div key={id} className={outcome}>
                <div>{gameDate.format("ddd, MMMM D")}</div>
                <Game>
                  <TeamButton
                    disabled={disabled}
                    active={visActive}
                    onClick={save(id, visTm, week)}
                  >
                    {visTm}
                  </TeamButton>
                  <div>{gameDate.format("h:mm A")}</div>
                  <TeamButton
                    disabled={disabled}
                    active={homeActive}
                    onClick={save(id, homeTm, week)}
                  >
                    {homeTm}
                  </TeamButton>
                </Game>
              </div>
            );
          }
        )}
      </PickPage>
    </>
  );
};

export default Picker;
