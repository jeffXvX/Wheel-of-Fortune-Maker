import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesComponent } from './files.component';
import { FilesService } from './files.service';
import { MaterialComponentsModule } from 'src/app/material-components/material-components.module';

@NgModule({
  declarations: [FilesComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule
  ],
  providers: [FilesService],
  exports:[FilesComponent]
})
export class FilesModule { }
