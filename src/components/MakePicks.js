import React, { useEffect, useState } from "react";
import ActionButton from "./Styled/ActionButton";
import Footer from "./Styled/Footer";
import chevron from "../img/Chevron.png";
import {
  loadFirstGame,
  getTotalGames,
  getNumberOfPicks
} from "../data/firebaseGameAPI";
import { useSpring } from "react-spring";
import useRouter from "./hooks/useRouter";
import PickSkeleton, { GameContainer as GC } from "./PickSkeleton";
import GameContainer from "./GameContainer";
// import Picker from "./Picker";
const MakePicks = ({ week, uid, user, setHeader }) => {
  const [game, setGame] = useState({});
  const [ratio, setRatio] = useState([]);
  const { history } = useRouter();
  const [activated, setActivated] = useState(false);
  const save = () => {};
  useEffect(() => {
    const getFirstGame = async () => {
      const g = await loadFirstGame(week);
      setGame(g);
    };
    const getRatio = async () => {
      const picks = await getNumberOfPicks(uid, week);
      const totalGames = getTotalGames(week);
      setRatio([picks, totalGames]);
    };
    getFirstGame();
    getRatio();
  }, [uid, week]);
  const props = useSpring({
    config: { duration: 500 },
    from: { top: "75vh" },
    to: { top: activated ? "5vh" : "75vh" }
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
          {ratio && (
            <span>
              <sup>{ratio[0]}</sup>&frasl;<sub>{ratio[1]}</sub>
            </span>
          )}
        </ActionButton>
      )}
      {!activated ? (
        <GC>
          <GameContainer
            style={{ paddingLeft: "5vw" }}
            game={game}
            save={save}
          />
        </GC>
      ) : (
        <PickSkeleton />
        // <Picker user={user} setHeader={setHeader} />
      )}
    </Footer>
  );
};

export default MakePicks;
