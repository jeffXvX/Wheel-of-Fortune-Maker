import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { puzzlesRequired, maxCharacters } from './game.model';
import { GameService } from './game.service';
import { RomConstantsService } from '../rom/rom-constants/rom-constants.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'wof-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent {
  scrollingTextLength$: Observable<number>;
  introTextLength$: Observable<number>;

  totalPuzzles$: Observable<number>;
  charactersUsed$: Observable<number>;

  puzzlesProgress$: Observable<number>;
  charactersProgress$: Observable<number>;
  
  puzzlesRequired = puzzlesRequired;
  maxCharacters = maxCharacters;

  gameForm = new FormGroup({
    name: new FormControl(''),
    scrollingText: new FormControl(''),
    introText: new FormControl(['','',''])
  });

  constructor(
    private fb: FormBuilder,
    private gameService: GameService, 
    private constsService: RomConstantsService) { 

      this.gameService.gameConfigForm$.subscribe(form=>{
        console.log('form updated:', form);
      })
      /*
      this.gameService.gameName$.subscribe(name=>{
        console.log('game name changed',name);
      });
      */
      
      /*
      this.gameService.game$.subscribe(name=>{
        console.log('game changed',name);
      });
      */
      

      /*
      this.gameForm.controls['name'].valueChanges.subscribe(name=>{
        console.log('control name changed:', name);
      });
      */

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
 
  onSubmit(e){
    console.log('game form submitting');    
  }

}
