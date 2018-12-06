import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatExpansionModule, MatProgressBarModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressBarModule,
    ScrollingModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressBarModule,
    ScrollingModule
  ]
})
export class MaterialComponentsModule { }
