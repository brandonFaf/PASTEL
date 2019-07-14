import React, { useEffect, useState } from "react";
import ActionButton from "./Styled/ActionButton";
import Footer from "./Styled/Footer";
import Game from "./Game";
import chevron from "../img/Chevron.png";
import { loadFirstGame } from "../data/firebaseGameAPI";
import { Link } from "react-router-dom";

const MakePicks = ({ week }) => {
  const [game, setGame] = useState({});
  const save = () => {};
  useEffect(() => {
    const getFirstGame = async () => {
      const g = await loadFirstGame(week);
      setGame(g);
    };
    getFirstGame();
    return () => {};
  }, [week]);
  return (
    <Footer>
      <ActionButton>
        <Link to="/pick">
          <img src={chevron} alt="chevron" />
          Make Your Picks
          <span>5/16</span>
        </Link>
      </ActionButton>
      <Game game={game} save={save} />
    </Footer>
  );
};

export default MakePicks;
