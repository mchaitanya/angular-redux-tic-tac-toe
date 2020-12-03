import { createSelector } from "@ngrx/store";
import { GameState, Grid, Token } from "./game.reducer";

export interface AppState {
  game: GameState;
}

export const selectGame = (state: AppState) => state.game;

export const selectGrid = createSelector(
  selectGame,
  (state: GameState) => state.grid
);

export const selectCurrentPlayer = createSelector(
  selectGame,
  (state: GameState) => state.currentPlayer
);

export const selectWinner = createSelector(
  selectGame,
  (state: GameState) => state.winner
);

export const selectStatus = createSelector(
  selectWinner,
  selectCurrentPlayer,
  selectGrid, 
  (winner: Token, player: Token, grid: Grid) => {
    if (winner !== undefined) {
      return `${winner} won ✔️`;
    } else if (grid.every(sq => sq !== '.')) {
      return 'Game over 🛑';
    } else {
      return `${player}'s turn.`;
    }
  }
);
