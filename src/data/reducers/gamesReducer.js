const PICKS_LOADED = "PICKS_LOADED";
const LOAD_GAMES = "LOAD_GAMES";
const SAVE_PICK = "SAVE_PICK";
export const gameActions = { PICKS_LOADED, LOAD_GAMES, SAVE_PICK };

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
      console.log(action.value);
      return { games: action.value };
    case PICKS_LOADED: {
      const games = state.games.map(g => {
        const pick = action.value.find(p => p.gameId == g.id);
        if (pick) {
          g.selected = pick.team;
        }
        return g;
      });
      return { ...state, games };
    }
    default:
      return state;
  }
};
