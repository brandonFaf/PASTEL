import React, { useState, useEffect, useReducer, useRef } from "react";
import { loadGames, savePick, loadPicks } from "../data/firebaseGameAPI";
import { gamesReducer, gameActions } from "../data/reducers/gamesReducer";
import { PickPage } from "./Styled/Picker";
import GameContainer from "./GameContainer";
import WeekSlider from "./Styled/WeekSlider";
import PickSkeleton from "./PickSkeleton";
import ActionButton from "./Styled/ActionButton";
import chevron from "../img/Chevron.png";
import { animated, useSpring } from "react-spring";
import getCurrentWeek from "../helpers/getCurrentWeek";
const Picker = ({ user, history, setHeader }) => {
  const weekBox = useRef();
  const [state, dispatch] = useReducer(gamesReducer, { games: [] });

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
    setHeader("Make Your Picks");
  }, [setHeader, userId, week]);
  useEffect(() => {
    if (weekBox.current) {
      weekBox.current.scrollLeft = ((week - 1) * window.innerWidth) / 5;
    }
  }, [week]);
  const save = (gameId, teamName, week) => () => {
    savePick({ gameId, teamName, userId, displayName, week });
    dispatch({ type: gameActions.SAVE_PICK, value: { gameId, teamName } });
    console.log("save", teamName);
  };
  const changeWeek = week => () => {
    setWeek(week);
  };
  const weekNumbers = new Array(17).fill("1");
  const [activated, setActivated] = useState(false);
  const close = () => {
    setActivated(true);
    dispatch({ type: gameActions.CLEAR });
    setTimeout(() => {
      history.push("/");
    }, 600);
  };
  const props = useSpring({
    config: { duration: 500 },
    from: { top: "5vh" },
    to: { top: activated ? "75vh" : "5vh" }
  });
  return (
    <animated.div
      style={{ ...props, position: activated ? "fixed" : "static" }}
    >
      {state.games.length === 0 ? (
        <PickSkeleton />
      ) : (
        <PickPage>
          <ActionButton small onClick={close}>
            <img src={chevron} className="down" alt="chevron" />
          </ActionButton>
          {state.games.map(game => (
            <GameContainer game={game} save={save} key={game.id} />
          ))}
        </PickPage>
      )}
      {state.games.length > 0 && (
        <WeekSlider ref={weekBox}>
          {weekNumbers.map((x, i) => (
            <div
              key={i}
              className={i + 1 === week ? "active" : ""}
              onClick={changeWeek(i + 1)}
            >
              <div>{i + 1 === week && "WEEK"}</div>
              {i + 1}
            </div>
          ))}
        </WeekSlider>
      )}
    </animated.div>
  );
};

export default Picker;
