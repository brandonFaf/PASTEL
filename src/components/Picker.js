import React, { useEffect, useContext, useReducer } from "react";
import { loadGames, savePick, loadPicks } from "../data/firebaseGameAPI";
import { UserContext } from "../contexts/UserContext";
import { gamesReducer, gameActions } from "../data/reducers/gamesReducer";
import "./Picker.css";
const Picker = () => {
  const [state, dispatch] = useReducer(gamesReducer, { games: [] });
  const {
    user: { id: userId }
  } = useContext(UserContext);
  useEffect(() => {
    const getGames = async () => {
      const games = await loadGames();
      dispatch({ type: gameActions.LOAD_GAMES, value: games });
    };
    const getPicks = async () => {
      const picks = await loadPicks(userId);
      dispatch({ type: gameActions.PICKS_LOADED, value: picks });
    };
    getGames();
    getPicks();
  }, [userId]);
  const save = (gameId, teamName, week) => () => {
    // console.log(week);
    savePick(gameId, teamName, userId, week);
    dispatch({ type: gameActions.SAVE_PICK, value: { gameId, teamName } });
    console.log("save", teamName);
  };
  return (
    <div>
      {state.games.map(x => (
        <div key={x.id}>
          <button
            className={x.selected === x.visTm ? "active" : ""}
            onClick={save(x.id, x.visTm, x.week)}
          >
            {x.visTm}
          </button>
          {"@"}
          <button
            className={x.selected === x.homeTm ? "active" : ""}
            onClick={save(x.id, x.homeTm, x.week)}
          >
            {x.homeTm}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Picker;
