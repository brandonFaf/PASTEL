import { db } from "./firebaseConfig";
export const loadGames = (week = 1) => {
  return db
    .collection("games")
    .where("Week", "==", week)
    .get();
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
