import React, { useState, useEffect } from "react";
import { loadGames } from "../data/firebaseGameAPI";

const Picker = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    const getGames = async () => {
      const gs = await loadGames();
      setGames(gs.docs.map(x => ({ ...x.data(), id: x.id })));
    };
    getGames();
  }, []);
  return (
    <div>
      {games.map(x => (
        <div key={x.id}>
          <button>{x.VisTm}</button>
          {"@"}
          <button>{x.HomeTm}</button>
        </div>
      ))}
    </div>
  );
};

export default Picker;
