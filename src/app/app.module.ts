import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { StoreModule } from '@ngrx/store';
import * as Game from './game/game.reducer';

import { AppComponent } from "./app.component";
import { GameComponent } from './game/game.component';

@NgModule({
  imports: [
    BrowserModule, 
    StoreModule.forRoot({game: Game.reducer})
  ],
  declarations: [AppComponent, GameComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
