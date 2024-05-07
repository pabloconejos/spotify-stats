import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../../service/spotify.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TopItemsService} from "../../service/top-items.service";
import {Artist} from "../../common/interfaces";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit{

  topArtists: Artist[] = [];
  loaded: boolean = false;

  constructor(private spotiService: SpotifyService,
              private route: ActivatedRoute,
              private listsService: TopItemsService,
              private router: Router,
              private titulo: Title) {

    titulo.setTitle('Tus artistas TOP')

  }

  ngOnInit() {

    this.loaded = false;
    this.route.url.subscribe(urlSegments => {
      const paths = urlSegments.map(segment => segment.path).join('/');
      console.log('Ruta actual:', paths);

      switch (paths){

        case 'artist4semanas':
          this.listsService.getShortArtist().subscribe(
            artsit => {
              console.log(artsit);
              this.topArtists = artsit
              this.loaded = true;
            },
            error => {
              console.error(error);
            }
          );
          break;
        case 'artist6meses':
          this.listsService.getMidArtist().subscribe(
            artsit => {
              console.log(artsit);
              this.topArtists = artsit
              this.loaded = true;
            },
            error => {
              console.error(error);
            }
          );
          break;
        case 'artistdeporvida':
          this.listsService.getLongArtist().subscribe(
            artsit => {
              console.log(artsit);
              this.topArtists = artsit
              this.loaded = true;
            },
            error => {
              console.error(error);
            }
          );
          break;
      }

    })


  }


  getGenresNames(genres: any[]): string {
    return genres.map((a: { name: string }) => a).join(', ');
  }


  one_item(artist: Artist) {
    this.router.navigate(['/one-artist', artist.id]);
  }

  openSptify(spotify: any) {
    console.log(spotify);
    window.location.href= spotify
  }
}
