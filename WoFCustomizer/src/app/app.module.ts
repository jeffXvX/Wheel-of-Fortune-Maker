import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { WoFLayoutModule } from './layout/layout.module';
import { StoreModule } from './store/store.module';
import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    WoFLayoutModule,
    StoreModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
