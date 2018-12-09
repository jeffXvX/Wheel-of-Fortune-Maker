import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Game, puzzlesRequired } from './game.model';
import { GameService } from './game.service';
import { Observable } from 'rxjs';
import { Category } from './category/category.model';
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
  puzzlesProgress$: Observable<number>;

  puzzlesRequired = puzzlesRequired;

  constructor(private gameService: GameService) { 
    this.game$ = this.gameService.game$;
    this.gameName$ = this.gameService.gameName$;
    this.totalPuzzles$ = this.gameService.totalPuzzles$;
    this.puzzlesProgress$ = this.totalPuzzles$.pipe(
      map(puzzles=>(puzzles/this.puzzlesRequired) *100));
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
