import { isPastTime } from "../../helpers/isPastTime";
const USER_PICKS_LOADED = "USER_PICKS_LOADED";
const GAME_PICKS_LOADED = "GAME_PICKS_LOADED";
const LOAD_GAMES = "LOAD_GAMES";
const SAVE_PICK = "SAVE_PICK";
const CLEAR = "CLEAR";
export const gameActions = {
  USER_PICKS_LOADED,
  LOAD_GAMES,
  SAVE_PICK,
  GAME_PICKS_LOADED,
  CLEAR
};

const allGames = games => {
  const { upcoming = [], completed = [], inProgress = [] } = games;
  return [...upcoming, ...completed, ...inProgress];
};

const sortGames = games => {
  return games.reduce(
    (acc, g) => {
      if (g.winner) {
        acc.completed.push(g);
      } else if (isPastTime(g)) {
        acc.inProgress.push(g);
      } else {
        acc.upcoming.push(g);
      }
      return acc;
    },
    { completed: [], inProgress: [], upcoming: [] }
  );
};

export const gamesReducer = (state, action) => {
  switch (action.type) {
    case SAVE_PICK: {
      let upcoming = state.games.upcoming.map(g => {
        if (g.id === action.value.gameId) {
          g.selected = action.value.selected;
        }
        return g;
      });
      const count = allGames(upcoming).filter(g => g.selected).length;
      return { games: { ...state.games, upcoming }, count };
    }
    case LOAD_GAMES: {
      const games = sortGames(action.value);
      return { games: games };
    }
    case USER_PICKS_LOADED: {
      console.log("User picks Loaded");
      let games = allGames(state.games).map(g => {
        const pick = action.value.find(p => p.gameId === g.id);
        if (pick) {
          g.selected = pick.selected;
        }
        return g;
      });
      games = sortGames(games);
      const count = action.value.length;
      return { ...state, games, count };
    }
    case GAME_PICKS_LOADED: {
      console.log("picks Loaded");
      let games = allGames(state.games).map(game => {
        const gamePicks = action.value[game.id] || [];
        game.totalPicks = gamePicks.length;
        game.pickedHomeTm = gamePicks
          .filter(p => p.selected === game.homeTm)
          .map(x => x.displayName);
        game.pickedVisTm = gamePicks
          .filter(p => p.selected === game.visTm)
          .map(x => x.displayName);
        return game;
      });
      games = sortGames(games);
      return { ...state, games };
    }
    case CLEAR: {
      return {
        ...state,
        games: { upcoming: [], completed: [], inProgress: [] }
      };
    }
    default:
      return state;
  }
};
