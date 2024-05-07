import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SongListComponent} from "./components/song-list/song-list.component";
import {LoginComponent} from "./components/login/login.component";
import {CallbackComponent} from "./components/callback/callback.component";
import {ArtistListComponent} from "./components/artist-list/artist-list.component";
import {OneSongComponent} from "./components/one-song/one-song.component";
import {OneArtistComponent} from "./components/one-artist/one-artist.component";
import {HomeComponent} from "./components/home/home.component";
import {PlayListComponent} from "./components/play-list/play-list.component";
import {EstadisticasComponent} from "./components/estadisticas/estadisticas.component";
import {NewplaylistComponent} from "./components/newplaylist/newplaylist.component";
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: 'tracks4semanas',
    component: SongListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tracks6meses',
    component: SongListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tracksdeporvida',
    component: SongListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'artist4semanas',
    component: ArtistListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'artist6meses',
    component: ArtistListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'artistdeporvida',
    component: ArtistListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'one-song/:id',
    component: OneSongComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'one-artist/:id',
    component: OneArtistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'playList',
    component: PlayListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'estadisticas',
    component: EstadisticasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'newplaylist',
    component: NewplaylistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "home"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
