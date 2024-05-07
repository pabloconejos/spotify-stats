import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../../service/spotify.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TopItemsService} from "../../service/top-items.service";

@Component({
  selector: 'app-one-artist',
  templateUrl: './one-artist.component.html',
  styleUrls: ['./one-artist.component.css']
})
export class OneArtistComponent implements OnInit {

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
      this.spotiService.getArtist(ruta[1]).subscribe(
        song => {
          console.log(song)
        },
        error => {
          console.error(error);
        }
      );

    });

  }

}
