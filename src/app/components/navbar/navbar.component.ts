import {Component, OnInit} from '@angular/core';
import {SongListComponent} from "../song-list/song-list.component";
import {ActivatedRoute, Router} from "@angular/router";
import {SpotifyService} from "../../service/spotify.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  titulo: string = 'Top';

  constructor(private route: ActivatedRoute,
              private spotifyService: SpotifyService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.route.url.subscribe(urlSegments => {
      const paths = urlSegments.map(segment => segment.path).join('/');
      let ruta = paths.split('/');
      console.log(ruta[0])

      switch (ruta[0]){
        case 'one-song':



          break;
        case 'one-artist':



          break;
      }

    });

  }


  log_out() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}
