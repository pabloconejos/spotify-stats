import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../../service/spotify.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TopItemsService} from "../../service/top-items.service";
import {Song, User} from "../../common/interfaces";
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  notInDashboard: boolean = false;
  tracks: any[] = [];
  user!: User;

  img_PlayList: string = '';
  img_Top: string = '';
  img_User: string = '';
  img_Stats: string = '';
  loaded: boolean = false;
  no_playlist: boolean = false;
  no_top: boolean = false;

  constructor(private spotiService: SpotifyService,
              private route: ActivatedRoute,
              private listsService: TopItemsService,
              private router: Router,
              private _snackBar: MatSnackBar, private titulo: Title) {
    titulo.setTitle('Music Numbers')
  }

  ngOnInit(): void {

    this.loaded = false;
    this.no_playlist = false;
    this.no_top = false;

    this.listsService.getShortTracks().subscribe(
      tracks => {
        this.notInDashboard = false;
        if (tracks.length == 0){
          this.img_Top = '../../assets/nodata.png'
          this.no_top = true;
        } else {
          this.img_Top = tracks[0].album.images[0].url
        }
      },
      error => {
        console.log('getShortTracksERROR')
        console.error(error);
        if (error.error == "User not registered in the Developer Dashboard"){
          this.notInDashboard = true;
        }
      }
    );

    this.spotiService.getRecentlyPlayed().subscribe(
      tracks => {
        this.notInDashboard = false;
        if (tracks.items.length == 0){
          this.tracks = [];
        } else {
          this.tracks = tracks.items
          console.log('escuchados recientemente: ', tracks)
        }


      },
      error => {
        console.log('getRecentlyPlayedERROR')
        console.error(error);
        if (error.error == "User not registered in the Developer Dashboard"){
          this.notInDashboard = true;
        }
      }
    )


    this.spotiService.getUser().subscribe(
      user => {
        this.notInDashboard = false;
        console.log(user)
        this.user = user;
        if (user.images[0]){

          this.img_User = user.images[0].url
          localStorage.setItem('user_id', user.id);
        } else {
          this.img_User = '../../assets/adromicfms4.jpg'
        }

      },
      error => {
        console.log('getUserERROR')
        console.error(error);
        if (error.error == "User not registered in the Developer Dashboard"){
          this.notInDashboard = true;
        }
      }
    )

    setTimeout(() => {

      this.spotiService.getPlaylists(this.user.id).subscribe(
        playList => {
          console.log(playList)
          this.notInDashboard = false;
          if (playList.items[0]){
            this.img_PlayList = playList.items[0].images[0].url
            this.loaded = true

          } else {
            this.img_PlayList = '../../assets/nodata-1.png'
            this.loaded = true;
            this.no_playlist = true;
          }

        },
        error => {
          console.log('getPlaylistsERROR')
          console.error(error);
          if (error.error == "User not registered in the Developer Dashboard"){
            this.notInDashboard = true;
          }

        }
      );

    }, 500);

  }



  getArtistsNames(artists: any[]): string {
    return artists.map((a: { name: string }) => a.name).join(', ');
  }


  getSeconds(duration_ms: any) {
    const totalSeconds = Math.floor(duration_ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    if (seconds < 10){
      return minutes+':0'+seconds
    } else {
      return minutes+':'+seconds
    }


  }

  openSptify(spotify: any) {
    window.location.href= spotify
  }

  routeador(ruta: string) {

    switch (ruta){
      case '/playList':
        if (this.no_playlist){
          console.log('no hay datos');
          this.mostrarAviso('No hay datos disponibles.');
        } else {
          this.router.navigate([ruta])
        }

        break
      case '/tracks4semanas':
        if (this.no_top){
          console.log('no hay datos');
          this.mostrarAviso('No hay datos disponibles.');
        } else {
          this.router.navigate([ruta]);
        }

        break
      case '/estadisticas':
        if (this.no_top){
          console.log('no hay datos');
          this.mostrarAviso('No hay datos disponibles.');
        } else {
          this.router.navigate([ruta])
        }

        break;
      default:

        break;
    }

  }

  mostrarAviso(mensaje: string) {
    this._snackBar.open(mensaje, 'Cerrar',{
      duration: 3000
    });
  }
}
