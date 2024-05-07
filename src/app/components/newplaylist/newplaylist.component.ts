import {Component, OnInit} from '@angular/core';
import {Song} from "../../common/interfaces";
import {SpotifyService} from "../../service/spotify.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TopItemsService} from "../../service/top-items.service";
import {DomSanitizer, SafeResourceUrl, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-newplaylist',
  templateUrl: './newplaylist.component.html',
  styleUrls: ['./newplaylist.component.css']
})
export class NewplaylistComponent implements OnInit{

  topTracks: Song[] = [];
  selectTracks: string[] = [];
  trackUris: string[] = [];

  recomended_songs: any[] = [];
  id_playlist: string = '';
  loaded: boolean = false;
  playlistUrl: SafeResourceUrl = '';

  constructor(private spotiService: SpotifyService,
              private route: ActivatedRoute,
              private listsService: TopItemsService,
              private router: Router,
              private sanitizer: DomSanitizer, private titulo: Title) {
    titulo.setTitle('Musica recomendada')
  }

  ngOnInit() {

    this.loaded = false;
    //1-OBTENER TRACKS MAS ESCUCHADOS
    this.listsService.getShortTracks().subscribe(
      tracks => {
        console.log(tracks)
        this.topTracks = tracks
        for (let a of this.topTracks){
          this.selectTracks.push(''+a.id)
        }
        this.selectTracks = this.selectTracks.slice(0, 5);
        //2- OBTENER CANCIONES RECOMENDADAS (en base a las mas escuchadas)
        this.spotiService.getRecomendedSongs(this.selectTracks).subscribe(
          tracks => {
            console.log('TRACKS.tracks: ',tracks.tracks)

            for (let a of tracks.tracks){
              this.trackUris.push(a.uri);
            }

            let user_id = localStorage.getItem('user_id') || '';

            this.spotiService.createPlaylist(user_id,'Pablo´s App recommendations playlist','PlayList based on your top 5 songs').subscribe(
              playList => {
                console.log(playList.id)

                this.id_playlist = playList.id;
                this.spotiService.addTracksToPlaylist(playList.id, this.trackUris)
                  .subscribe(() => {
                    console.log('Canciones agregadas a la playlist.');
                    this.playlistUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://open.spotify.com/embed/playlist/'+this.id_playlist);

                    this.loaded = true;
                  });


              }
            )



          },
          error => {
            console.error(error);
          }
        );
      },
      error => {
        console.error(error);
      }
    );



  }

}
