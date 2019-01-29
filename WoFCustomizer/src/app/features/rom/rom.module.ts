import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RomService } from './rom.service';
import { ConfigEntryEncoderService } from './encoder/config-entry-encoder.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [RomService, ConfigEntryEncoderService]
})
export class RomModule { }
