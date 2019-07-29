import { db } from "./firebaseConfig";
import { isPastTime } from "../helpers/isPastTime";
const picksRef = db.collection("picks");
let gamesRef = db.collection("games");
if (window.location.pathname.includes("past")) {
  gamesRef = db.collection("pastGames");
}
export const loadGames = (week = 1) => {
  return gamesRef
    .where("week", "==", week)
    .get()
    .then(games => {
      return games.docs.map(x => ({ ...x.data(), id: x.id }));
    });
};
export const loadFirstGame = (week = 1) => {
  return gamesRef
    .where("week", ">=", week)
    .where("week", "<=", week + 1)
    .limit(17)
    .get()
    .then(games => {
      return games.docs
        .map(x => ({ ...x.data(), id: x.id }))
        .find(x => !x.winner && !isPastTime(x));
    });
};
export const savePick = pick => {
  return picksRef.doc(`${pick.gameId}${pick.userId}`).set(pick);
};
export const loadPicks = (userId, week = 1) => {
  return picksRef
    .where("week", "==", week)
    .get()
    .then(picks => {
      return picks.docs.reduce(
        (acc, pick) => {
          const pickData = { ...pick.data(), id: pick.id };
          if (pickData.userId === userId) {
            acc.userPicks.push(pickData);
          }
          const gamePicks = acc.gamePicks[pickData.gameId] || [];
          gamePicks.push(pickData);
          acc.gamePicks[pickData.gameId] = gamePicks;
          return acc;
        },
        { gamePicks: {}, userPicks: [] }
      );
    });
};
export const getNumberOfPicks = (uid, week) => {
  return picksRef
    .where("week", "==", week)
    .where("userId", "==", uid)
    .get()
    .then(snap => snap.size);
};
const totalGames = {
  1: 16,
  2: 16,
  3: 16,
  4: 16,
  5: 16,
  6: 16,
  7: 16,
  8: 16,
  9: 16,
  10: 16,
  11: 16,
  12: 16,
  13: 16,
  14: 16,
  15: 16,
  16: 16,
  17: 16
};
export const getTotalGames = week => {
  return totalGames[week];
};
