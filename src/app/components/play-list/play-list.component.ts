import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../../service/spotify.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TopItemsService} from "../../service/top-items.service";
import {Item_playList, PlayList, Respuesta, Song, User} from "../../common/interfaces";
import {async} from "rxjs";
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.css']
})
export class PlayListComponent implements OnInit{


  id_user: string = '';
  lista_playList!: Respuesta;
  playList!: any;
  items!: Item_playList[]
  tracks!: Song[]

  load: boolean = false;
  selectedPlaylist: any;

  constructor(private spotiService: SpotifyService,
              private route: ActivatedRoute,
              private listsService: TopItemsService,
              private router: Router, private titulo: Title) {
    titulo.setTitle('Tus Playlis')
  }

  ngOnInit(): void {

    this.load = false;
    this.id_user = localStorage.getItem('user_id') || '';;

    this.spotiService.getPlaylists(this.id_user).subscribe(
      playList => {

        console.log('Todas las playlist',playList)
        this.lista_playList = playList;
      },
      error => {
        console.error(error);
      }
    );

    setTimeout(() => {
      this.spotiService.getOnePlaylist(this.lista_playList.items[0].id).subscribe(
        playList => {

          this.playList = playList;
          console.log(playList);

          this.selectedPlaylist = playList.id;
          this.load = true;
        },
        error => {
          console.error(error);
        }
      );
    },500)


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
  getPlayList(id: any) {

    console.log(id);

    this.selectedPlaylist = id;
    this.spotiService.getOnePlaylist(id).subscribe(
      playList => {

        this.playList = playList;
        console.log(playList);
        this.load = true;
      },
      error => {
        console.error(error);
      }
    );

  }


  openSptify(spotify: any) {
    window.location.href= spotify
  }
}
