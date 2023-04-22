import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponenteComponent } from './components/componente/componente.component';
import { ChangeContentComponent } from './components/change-content/change-content.component';

import {ContentService} from './services/content.service';
import {GetContentService} from './services/getContent.service';

@NgModule({
  declarations: [
    AppComponent,
    ComponenteComponent,
    ChangeContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [ContentService, GetContentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
