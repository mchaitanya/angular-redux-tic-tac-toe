import { Action, createReducer, on } from "@ngrx/store";
import * as GameActions from "./game.actions";

export type Token = "X" | "O";
export type Empty = ".";
export type Square = Token | Empty;
export type Grid = [
  Square,
  Square,
  Square,
  Square,
  Square,
  Square,
  Square,
  Square,
  Square
];

// 0 1 2
// 3 4 5
// 6 7 8
const winningCombinations = [
  [0, 1, 2], // rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // cols
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonals
  [2, 4, 6]
];

export interface GameState {
  winner: Token | undefined;
  currentPlayer: Token;
  grid: Grid;
}

export const initialState: GameState = {
  winner: undefined,
  currentPlayer: "X",
  grid: [".", ".", ".", ".", ".", ".", ".", ".", "."]
};

const _reducer = createReducer(
  initialState,
  on(GameActions.reset, _ => initialState),
  on(GameActions.move, (state, { squareIx }) => {
    if (state.winner !== undefined) {
      return state;
    }

    const currentPlayer = state.currentPlayer;
    const nextPlayer = currentPlayer === "X" ? "O" : "X";
    const nextGrid = state.grid.map((sq, ix) => (ix === squareIx ? currentPlayer : sq));
    let nextWinner = state.winner;
    // check if this move produced a winner
    for (let comb of winningCombinations) {
      if (comb.every(ix => nextGrid[ix] === currentPlayer)) {
        nextWinner = currentPlayer;
        break;
      }
    }

    return {
      winner: nextWinner,
      currentPlayer: nextPlayer,
      grid: nextGrid
    };
  })
);

export function reducer(state: GameState | undefined, action: Action) {
  return _reducer(state, action);
}
