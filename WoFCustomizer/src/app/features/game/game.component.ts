import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game, puzzlesRequired, maxCharacters } from './game.model';
import { GameService } from './game.service';
import { RomConstantsService } from '../rom/rom-constants/rom-constants.service';

@Component({
  selector: 'wof-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent {
  game$: Observable<Game>;
  gameName$: Observable<string>;
  scrollingText$: Observable<string>;
  scrollingTextLength$: Observable<number>;
  introText$: Observable<string[3]>;
  introTextLength$: Observable<number>;

  /**
   * The intro text has a max length but not an individual
   * line length.  While this might mean that these can create
   * invald entries later, for now this means that the 3 lines 
   * lengths will be tracked individually and subtracted from 
   * the total length available to determine the max lengths
   * of each individual line.
   */
  introLine1Length$ = new BehaviorSubject<number>(0);
  introLine2Length$ = new BehaviorSubject<number>(0);
  introLine3Length$ = new BehaviorSubject<number>(0);

  totalPuzzles$: Observable<number>;
  charactersUsed$: Observable<number>;

  puzzlesProgress$: Observable<number>;
  charactersProgress$: Observable<number>;
  
  puzzlesRequired = puzzlesRequired;
  maxCharacters = maxCharacters;

  constructor(
    private gameService: GameService, 
    private constsService: RomConstantsService) { 
    this.game$ = this.gameService.game$;
    this.gameName$ = this.gameService.gameName$;
    this.scrollingText$ = this.gameService.scrollingText$;
    this.introText$ = this.gameService.introText$;
    this.totalPuzzles$ = this.gameService.totalPuzzles$;
    this.charactersUsed$ = this.gameService.charactersUsed$;
    this.puzzlesProgress$ = this.totalPuzzles$.pipe(
      map(puzzles=>(puzzles/this.puzzlesRequired) *100));
    this.charactersProgress$ = this.charactersUsed$.pipe(
      map(characters=>(characters/this.maxCharacters) *100));

    this.scrollingTextLength$ = this.constsService.romConstants$.pipe(
      map(constants=>constants.titleScrollingTextLength));

    this.introTextLength$ = this.constsService.romConstants$.pipe(
      map(constants=>constants.introTextLength));
  }
 
  onNameChange(e) {
    this.gameService.setGameName(e.target.value);
  }

  onScrollingTextChange(e) {
    this.gameService.setScrollingText(e.target.value);
  }

  onIntroTextChange(e, index: number) {
    this.gameService.setIntroText(e.target.value, index);

    /**
     * Update the total length available for the intro text
     */
    switch(index) {
      case 0: {
        this.introLine1Length$.next(e.target.value.length);
        break;
      }
      case 1: {
        this.introLine2Length$.next(e.target.value.length);
        break;
      }
      case 2: {
        this.introLine3Length$.next(e.target.value.length);
        break;
      }
    }
  }

  onSubmit(e){
    e.preventDefault();
  }

}
