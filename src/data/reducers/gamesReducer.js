const USER_PICKS_LOADED = "USER_PICKS_LOADED";
const GAME_PICKS_LOADED = "GAME_PICKS_LOADED";
const LOAD_GAMES = "LOAD_GAMES";
const SAVE_PICK = "SAVE_PICK";
export const gameActions = {
  USER_PICKS_LOADED,
  LOAD_GAMES,
  SAVE_PICK,
  GAME_PICKS_LOADED
};

export const gamesReducer = (state, action) => {
  switch (action.type) {
    case SAVE_PICK:
      const games = state.games.map(g => {
        if (g.id === action.value.gameId) {
          g.selected = action.value.teamName;
        }
        return g;
      });
      return { games };
    case LOAD_GAMES:
      return { games: action.value };
    case USER_PICKS_LOADED: {
      const games = state.games.map(g => {
        const pick = action.value.find(p => p.gameId === g.id);
        if (pick) {
          g.selected = pick.teamName;
        }
        return g;
      });
      return { ...state, games };
    }
    case GAME_PICKS_LOADED: {
      const games = state.games.map(game => {
        const gamePicks = action.value[game.id] || [];
        game.totalPicks = gamePicks.length;
        game.pickedHomeTm = gamePicks
          .filter(p => p.teamName === game.homeTm)
          .map(x => x.displayName);
        game.pickedVisTm = gamePicks
          .filter(p => p.teamName === game.visTm)
          .map(x => x.displayName);
        return game;
      });
      return { ...state, games };
    }
    default:
      return state;
  }
};