import React, { useState, useEffect, useReducer, useRef } from "react";
import { loadGames, savePick, loadPicks } from "../data/firebaseGameAPI";
import { gamesReducer, gameActions } from "../data/reducers/gamesReducer";
import moment from "moment";
import { PickPage } from "./Styled/Picker";
import Header from "./Styled/Header";
import ProfilePhoto from "./Styled/ProfilePhoto";
import Game from "./Game";
import Footer from "./Styled/Footer";
import { StickyContainer, Sticky } from "react-sticky";

const Picker = ({ user }) => {
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
    weekBox.current.scrollLeft = ((week - 1) * window.innerWidth) / 5;
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
  return (
    <>
      <StickyContainer>
        <Sticky>
          {({ style }) => (
            <Header style={style}>
              <div>Make Your Picks</div>
              <ProfilePhoto src={user.photoURL} alt="profile" />
            </Header>
          )}
        </Sticky>
        <PickPage>
          {state.games.map(game => (
            <Game game={game} user={user} save={save} key={game.id} />
          ))}
        </PickPage>
        <Footer ref={weekBox}>
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
        </Footer>
      </StickyContainer>
    </>
  );
};

export default Picker;
