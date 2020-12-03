import { createAction, props } from "@ngrx/store";
import { Token } from './game.reducer';

export const reset = createAction("[Game] Reset");

export const move = createAction(
  "[Game] Move",
  props<{ squareIx: number }>()
);
