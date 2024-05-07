import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { LoginComponent } from './components/login/login.component';
import { CallbackComponent } from './components/callback/callback.component';
import { HttpClientModule } from '@angular/common/http';
import {CommonModule} from "@angular/common";
import { NavbarComponent } from './components/navbar/navbar.component';
import { ArtistListComponent } from './components/artist-list/artist-list.component';
import { OneSongComponent } from './components/one-song/one-song.component';
import { OneArtistComponent } from './components/one-artist/one-artist.component';
import { HomeComponent } from './components/home/home.component';
import { PlayListComponent } from './components/play-list/play-list.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { NavbarGeneralComponent } from './components/navbar-general/navbar-general.component';
import { NewplaylistComponent } from './components/newplaylist/newplaylist.component';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    SongListComponent,
    LoginComponent,
    CallbackComponent,
    NavbarComponent,
    ArtistListComponent,
    OneSongComponent,
    OneArtistComponent,
    HomeComponent,
    PlayListComponent,
    EstadisticasComponent,
    NavbarGeneralComponent,
    NewplaylistComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    MatSnackBarModule,
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
