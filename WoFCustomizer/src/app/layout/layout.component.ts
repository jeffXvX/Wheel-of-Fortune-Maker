import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesService } from './../features/game/categories/categories.service';
import { GameService } from '../features/game/game.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'wof-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  gameLoaded$: Observable<boolean>;
  categoriesLoaded$: Observable<boolean>;
  
  constructor(
    private gameService: GameService, 
    private categoriesService: CategoriesService) { 
      this.gameLoaded$ = this.gameService.isLoaded$;
      this.categoriesLoaded$ = this.categoriesService.areLoaded$;
    }

  ngOnInit() {
  }
}
