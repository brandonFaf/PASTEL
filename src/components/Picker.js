import React, { useEffect, useContext, useReducer } from "react";
import { loadGames, savePick, loadPicks } from "../data/firebaseGameAPI";
import { UserContext } from "../contexts/UserContext";
import { gamesReducer, gameActions } from "../data/reducers/gamesReducer";
import "./Picker.css";
const Picker = () => {
  const [state, dispatch] = useReducer(gamesReducer, { games: [] });
  const {
    user: { id: userId, displayName }
  } = useContext(UserContext);
  useEffect(() => {
    const getGames = async () => {
      const games = await loadGames();
      dispatch({ type: gameActions.LOAD_GAMES, value: games });
    };
    const getPicks = async () => {
      const { userPicks, gamePicks } = await loadPicks(userId);
      dispatch({ type: gameActions.USER_PICKS_LOADED, value: userPicks });
      dispatch({ type: gameActions.GAME_PICKS_LOADED, value: gamePicks });
    };
    getGames();
    getPicks();
  }, [userId]);
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

  return (
    <div>
      {state.games.map(
        ({ visTm, homeTm, selected, winner, id, week, ...picks }) => {
          let visCN = selected === visTm ? "active" : "";
          let homeCN = selected === homeTm ? "active" : "";
          let outcome = winner === selected ? "correct" : "wrong";
          return (
            <div key={id} className={outcome}>
              <div>
                <button className={visCN} onClick={save(id, visTm, week)}>
                  {visTm}
                </button>
                {"@"}
                <button className={homeCN} onClick={save(id, homeTm, week)}>
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
