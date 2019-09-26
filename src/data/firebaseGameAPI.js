import { db } from './firebaseConfig';
import { isPastTime } from '../helpers/isPastTime';
const picksRef = db.collection('picks');
let gamesRef = db.collection('games');
if (window.location.pathname.includes('past')) {
  gamesRef = db.collection('pastGames');
}
export const loadGames = (week = 1) => {
  return gamesRef
    .where('week', '==', week)
    .get()
    .then(games => {
      return games.docs.map(x => ({ ...x.data(), id: x.id }));
    });
};
export const loadFirstGame = (week = 1) => {
  return gamesRef
    .where('week', '>=', week)
    .where('week', '<=', week + 1)
    .limit(17)
    .get()
    .then(games => {
      return games.docs
        .map(x => ({ ...x.data(), id: x.id }))
        .find(x => !x.winner && !isPastTime(x));
    });
};
export const savePick = pick => {
  return picksRef.doc(`${pick.gameId}${pick.userId}${pick.groupId}`).set(pick);
};
export const loadPicks = (userId, week = 1, groupId) => {
  return picksRef
    .where('week', '==', week)
    .where('groupId', '==', groupId)
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
export const getNumberOfPicks = (uid, week, groupId) => {
  return picksRef
    .where('week', '==', week)
    .where('userId', '==', uid)
    .where('groupId', '==', groupId)
    .get()
    .then(snap => snap.size);
};
const totalGames = {
  1: 16,
  2: 16,
  3: 16,
  4: 15,
  5: 15,
  6: 14,
  7: 14,
  8: 15,
  9: 14,
  10: 13,
  11: 14,
  12: 14,
  13: 16,
  14: 16,
  15: 16,
  16: 16,
  17: 16
};
export const getTotalGames = week => {
  return totalGames[week];
};
