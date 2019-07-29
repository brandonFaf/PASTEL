import React, { useState, useEffect, useReducer, useRef } from "react";
import {
  loadGames,
  savePick,
  loadPicks,
  getTotalGames,
  getNumberOfPicks
} from "../data/firebaseGameAPI";
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
  const [ratio, setRatio] = useState("");

  useEffect(() => {
    const getGames = async () => {
      const games = await loadGames(week);
      dispatch({ type: gameActions.LOAD_GAMES, value: games });
    };
    getGames();
  }, [week]);
  useEffect(() => {
    const getPicks = async () => {
      const { userPicks, gamePicks } = await loadPicks(userId, week);
      dispatch({ type: gameActions.USER_PICKS_LOADED, value: userPicks });
      dispatch({ type: gameActions.GAME_PICKS_LOADED, value: gamePicks });
    };
    getPicks();
  }, [userId, week]);
  useEffect(() => {
    const getRatio = async () => {
      const picks = await getNumberOfPicks(userId, week);
      const totalGames = getTotalGames(week);
      setRatio(`${picks} / ${totalGames}`);
    };
    getRatio();
    const header = (
      <>
        Make Your Picks <span>{ratio}</span>
      </>
    );
    setHeader(header);
  }, [ratio, setHeader, userId, week]);

  useEffect(() => {
    if (weekBox.current) {
      weekBox.current.scrollLeft = ((week - 1) * window.innerWidth) / 5;
    }
  }, [week]);
  const save = (gameId, selected, week) => () => {
    savePick({ gameId, selected, userId, displayName, week });
    dispatch({ type: gameActions.SAVE_PICK, value: { gameId, selected } });
    console.log("save", selected);
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
