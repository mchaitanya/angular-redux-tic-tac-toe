import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Grid, Square } from "./game.reducer";
import { reset, move } from "./game.actions";
import { selectGrid, selectStatus } from "./game.selectors";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"]
})
export class GameComponent {
  grid$: Observable<Grid>;
  status$: Observable<string>;

  constructor(private store: Store) { 
    this.grid$ = store.select(selectGrid);
    this.status$ = store.select(selectStatus);
  }

  onReset() {
    this.store.dispatch(reset());
  }

  onMove(square: Square, squareIx: number) {
    if (square === '.') {
      this.store.dispatch(move({ squareIx: squareIx }));
    }
  }

}
