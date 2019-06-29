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
          {console.log(x)}
          <button
            className={x.selected === x.VisTm ? "active" : ""}
            onClick={save(x.id, x.VisTm, x.Week)}
          >
            {x.VisTm}
          </button>
          {"@"}
          <button
            className={x.selected === x.HomeTm ? "active" : ""}
            onClick={save(x.id, x.HomeTm, x.Week)}
          >
            {x.HomeTm}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Picker;
