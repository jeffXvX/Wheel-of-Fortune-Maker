import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Game } from './game.model';
import { GameService } from './game.service';
import { Observable } from 'rxjs';
import { Category } from './category/category.model';

@Component({
  selector: 'wof-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {
  game$: Observable<Game>;
  categories$: Observable<Category[]>;

  constructor(private gameService: GameService) { 
    this.game$ = this.gameService.game$;
    this.categories$ = this.gameService.categories$;
  }

  ngOnInit() {
  }
}
