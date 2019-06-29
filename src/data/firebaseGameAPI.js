import { db } from "./firebaseConfig";
const picksRef = db.collection("picks");
const gamesRef = db.collection("games");
export const loadGames = (week = 1) => {
  return gamesRef
    .where("Week", "==", week)
    .get()
    .then(games => {
      return games.docs.map(x => ({ ...x.data(), id: x.id }));
    });
};
export const savePick = (gameId, team, userId, week) => {
  return picksRef.doc(`${gameId}${userId}`).set({
    team,
    gameId,
    userId,
    week
  });
};
export const loadPicks = (userId, week = 1) => {
  return picksRef
    .where("week", "==", week)
    .where("userId", "==", userId)
    .get()
    .then(games => {
      return games.docs.map(game => {
        return { ...game.data(), id: game.id };
      });
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
