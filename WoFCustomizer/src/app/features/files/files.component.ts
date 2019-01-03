import { Component, OnInit } from '@angular/core';
import { FilesService } from './files.service';
import { Store, Select } from '@ngxs/store';
import { SetConfig, SelectGameConfig } from '../config/config.actions';
import { ConfigState } from '../config/config.state';
import { WoFConfig } from '../config/config.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'wof-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  @Select(ConfigState.config) config$: Observable<WoFConfig>;

  constructor(private filesService: FilesService, private store: Store) { }

  ngOnInit() {
    this.config$.subscribe(c=>console.log('store config:',c));
  }

  buildConfig() {
    this.filesService.buildGameJSON();
  }

  openConfig(e: Event) {
    const f = (e.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    
    reader.onloadend = pe => {
      console.log('read end:',reader.result);
      console.log('json:',JSON.parse(reader.result as string));
      
      let json = JSON.parse(reader.result as string);
      this.store.dispatch(new SetConfig(json));
      this.store.dispatch(new SelectGameConfig({id: 0}));
      
    };

    const text = reader.readAsText(f);

    console.log('files',(e.target as HTMLInputElement).files);
  }
}
