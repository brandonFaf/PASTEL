import React, { useEffect, useState } from "react";
import ActionButton from "./Styled/ActionButton";
import Footer from "./Styled/Footer";
import Game from "./Game";
import chevron from "../img/Chevron.png";
import { loadFirstGame } from "../data/firebaseGameAPI";
import { useSpring } from "react-spring";
import useRouter from "./useRouter";
import PickSkeleton, { GameContainer } from "./PickSkeleton";
const MakePicks = ({ week }) => {
  const [game, setGame] = useState({});
  const { history } = useRouter();
  const [activated, setActivated] = useState(false);
  const save = () => {};
  useEffect(() => {
    const getFirstGame = async () => {
      const g = await loadFirstGame(week);
      setGame(g);
    };
    getFirstGame();
    return () => {};
  }, [week]);
  const props = useSpring({
    config: { duration: 500 },
    from: { top: "91vh" },
    to: { top: activated ? "5vh" : "91vh" }
  });

  const activate = () => {
    setActivated(true);
    setTimeout(() => {
      history.push("/pick");
    }, 500);
  };
  return (
    <Footer style={props}>
      {!activated && (
        <ActionButton onClick={activate}>
          <img src={chevron} alt="chevron" />
          Make Your Picks
          <span>5/16</span>
        </ActionButton>
      )}
      {!activated ? (
        <GameContainer>
          <Game style={{ paddingLeft: "5vw" }} game={game} save={save} />
        </GameContainer>
      ) : (
        <PickSkeleton />
      )}
    </Footer>
  );
};

export default MakePicks;
