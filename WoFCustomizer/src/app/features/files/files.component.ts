import { Component, OnInit } from '@angular/core';
import { FilesService } from './files.service';

@Component({
  selector: 'wof-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  constructor(private filesService: FilesService) { }

  ngOnInit() {
  }

  buildConfig() {
    this.filesService.buildGameJSON();
  }

}
