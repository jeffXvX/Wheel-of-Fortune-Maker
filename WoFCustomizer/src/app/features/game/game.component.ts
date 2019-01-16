import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Game, puzzlesRequired, maxCharacters } from './game.model';
import { GameService } from './game.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'wof-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {
  game$: Observable<Game>;
  gameName$: Observable<string>;
  totalPuzzles$: Observable<number>;
  charactersUsed$: Observable<number>;

  puzzlesProgress$: Observable<number>;
  charactersProgress$: Observable<number>;
  
  puzzlesRequired = puzzlesRequired;
  maxCharacters = maxCharacters;

  constructor(private gameService: GameService) { 
    this.game$ = this.gameService.game$;
    this.gameName$ = this.gameService.gameName$;
    this.totalPuzzles$ = this.gameService.totalPuzzles$;
    this.charactersUsed$ = this.gameService.charactersUsed$;
    this.puzzlesProgress$ = this.totalPuzzles$.pipe(
      map(puzzles=>(puzzles/this.puzzlesRequired) *100));
    this.charactersProgress$ = this.charactersUsed$.pipe(
      map(characters=>(characters/this.maxCharacters) *100));
    }

  ngOnInit() {
  }

  onNameChange(e) {
    this.gameService.setGameName(e.target.value);
  }

  MakeData() {
  }

  onSubmit(e){
    e.preventDefault();
  }

}
