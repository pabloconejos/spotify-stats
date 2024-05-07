import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../../service/spotify.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TopItemsService} from "../../service/top-items.service";
import {Song} from "../../common/interfaces";

@Component({
  selector: 'app-one-song',
  templateUrl: './one-song.component.html',
  styleUrls: ['./one-song.component.css']
})
export class OneSongComponent implements OnInit {


  song!: Song;


  constructor(private spotiService: SpotifyService,
              private route: ActivatedRoute,
              private listsService: TopItemsService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.route.url.subscribe(urlSegments => {
      const paths = urlSegments.map(segment => segment.path).join('/');
      console.log('Ruta actual:', paths);

      let ruta = paths.split('/');

      console.log(ruta[1]);
      this.spotiService.getSong(ruta[1]).subscribe(
        song => {

          this.song = song
          console.log(this.song)
        },
        error => {
          console.error(error);
        }
      );

    });
  }

  getArtistsNames(artists: any[]): string {
    return artists.map((a: { name: string }) => a.name).join(', ');
  }


}
