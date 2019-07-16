import React, { useState, useEffect, useReducer, useRef } from "react";
import { loadGames, savePick, loadPicks } from "../data/firebaseGameAPI";
import { gamesReducer, gameActions } from "../data/reducers/gamesReducer";
import moment from "moment";
import { PickPage } from "./Styled/Picker";
import Game from "./Game";
import WeekSlider from "./Styled/WeekSlider";
import PickSkeleton from "./PickSkeleton";
import ActionButton from "./Styled/ActionButton";
import chevron from "../img/Chevron.png";
import { animated, useSpring } from "react-spring";

const Picker = ({ user, history }) => {
  const weekBox = useRef();
  const [state, dispatch] = useReducer(gamesReducer, { games: [] });
  const getCurrentWeek = () => {
    let now = moment();
    const w = now.subtract(2, "d").week() - 35;
    return w > 0 ? w : 1;
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
  // const showPicked = game => {
  //   return (
  //     <div>
  //       <span>
  //         {(game.pickedVisTm.length / game.totalPicks).toFixed(2) * 100}% -{" "}
  //         {game.pickedVisTm.join(", ")}
  //       </span>
  //       <span />
  //       <span>
  //         {(game.pickedHomeTm.length / game.totalPicks).toFixed(2) * 100}% -{" "}
  //         {game.pickedHomeTm.join(", ")}
  //       </span>
  //     </div>
  //   );
  // };
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
            <Game game={game} user={user} save={save} key={game.id} />
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
