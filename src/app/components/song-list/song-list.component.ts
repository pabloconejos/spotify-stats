import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../../service/spotify.service";
import {Artist, Song} from "../../common/interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {TopItemsService} from "../../service/top-items.service";
import {timeout} from "rxjs";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css']
})
export class SongListComponent  implements OnInit {


  topTracks: Song[] = [];
  selectTracks: string[] = [];
  loaded: boolean = false;


  constructor(private spotiService: SpotifyService,
              private route: ActivatedRoute,
              private listsService: TopItemsService,
              private router: Router, private titulo: Title) {
    titulo.setTitle('Tus canciones TOP')
  }

  ngOnInit() {
    this.loaded = false;

    this.route.url.subscribe(urlSegments => {
      const paths = urlSegments.map(segment => segment.path).join('/');
      console.log('Ruta actual:', paths);

      switch (paths){
        case 'tracks4semanas':
          this.listsService.getShortTracks().subscribe(
            tracks => {
              console.log(tracks)
              this.topTracks = tracks
              this.loaded = true;
            },
            error => {
              console.error(error);
            }
          );
          break;
        case 'tracks6meses':
          this.listsService.getMidTracks().subscribe(
            tracks => {
              this.topTracks = tracks
              this.loaded = true;
            },
            error => {
              console.error(error);
            }
          );
          break;

        default:
          this.listsService.getLongTracks().subscribe(
            tracks => {
              this.topTracks = tracks
              this.loaded = true;
            },
            error => {
              console.error(error);
            }
          );
          break;

      }


    });

  }


  getArtistsNames(artists: any[]): string {
    return artists.map((a: { name: string }) => a.name).join(', ');
  }

  one_item(song: Song) {

    this.router.navigate(['/one-song', song.id]);

  }

  openSptify(spotify: any) {
    window.location.href= spotify
  }
}
