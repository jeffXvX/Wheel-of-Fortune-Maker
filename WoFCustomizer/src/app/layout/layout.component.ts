import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTabChangeEvent, MatTab } from '@angular/material';
import { LayoutService } from './layout.service';
import { Select } from '@ngxs/store';
import { GameFormState } from '../features/game-form/game-form.state';
import { CategoriesFormState } from '../features/categories-form/categories-form.state';

@Component({
  selector: 'wof-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  @ViewChild('configTab',{static: true}) configTab: MatTab;

  @Select(GameFormState.loaded) gameLoaded$: Observable<boolean>;
  @Select(CategoriesFormState.loaded) categoriesLoaded$: Observable<boolean>; 

  constructor(private layoutService: LayoutService) { 
  }

  ngOnInit() {
  }

  onTabChange(e: MatTabChangeEvent) {
    // Use this check so we don't have to refer to the config tab
    // by index.  This allows the layout to be changed, if ever 
    // necessary, without having to also update a magic constant.
    if(e.tab === this.configTab) {
      console.log('config!');
      this.layoutService.convertFormsToConfigEntry();
    }
    
  }
}
