import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import { ConfigService } from './config.service';
import { MaterialComponentsModule } from '../../material-components/material-components.module';

@NgModule({
  declarations: [ConfigComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule
  ],
  providers: [ConfigService],
  exports: [ConfigComponent]
})
export class ConfigModule { }
