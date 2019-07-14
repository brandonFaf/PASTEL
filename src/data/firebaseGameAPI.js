import { db } from "./firebaseConfig";
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
    .where("week", "==", week)
    .limit(1)
    .get()
    .then(games => {
      return games.docs.map(x => ({ ...x.data(), id: x.id }))[0];
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

// export default class GameAPI {
//   static save(updates) {
//     return firebase
//       .database()
//       .ref()
//       .update(updates);
//   }
//   static loadUserPicks(userId) {
//     return firebase
//       .database()
//       .ref(`picks/${userId}`)
//       .once("value");
//   }
//   static loadUserSurvivor(userId) {
//     return firebase
//       .database()
//       .ref(`survivor/${userId}`)
//       .once("value");
//   }
//   static loadUserRecords(userId) {
//     return firebase
//       .database()
//       .ref(`records/${userId}`)
//       .once("value");
//   }
//   static loadWeeklyRecords() {
//     return firebase
//       .database()
//       .ref("records/result")
//       .once("value");
//   }
//   static loadPicks() {
//     return firebase
//       .database()
//       .ref("picks")
//       .once("value");
//   }
//   static loadSurvivor() {
//     return firebase
//       .database()
//       .ref("survivor")
//       .once("value");
//   }
//   static loadWinners() {
//     return firebase
//       .database()
//       .ref("winners")
//       .once("value");
//   }
//   static loadLastUpdated() {
//     return firebase
//       .database()
//       .ref("updated")
//       .once("value");
//   }
// }
