import { Injectable } from '@angular/core';
import {SpotifyService} from "./spotify.service";
import {Song} from "../common/interfaces";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TopItemsService {




  constructor(private spotiService: SpotifyService) { }

  getShortTracks(): Observable<any> {
    return this.spotiService.getTopTracks('short').pipe(
      map(response => response.items)
    );
  }

  getMidTracks(): Observable<any> {
    return this.spotiService.getTopTracks('medium').pipe(
      map(response => response.items)
    );
  }

  getLongTracks(): Observable<any> {
    return this.spotiService.getTopTracks('long').pipe(
      map(response => response.items)
    );
  }

  getShortArtist(): Observable<any> {
    return this.spotiService.getTopArtist('short').pipe(
      map(response => response.items)
    );
  }

  getMidArtist(): Observable<any> {
    return this.spotiService.getTopArtist('medium').pipe(
      map(response => response.items)
    );
  }

  getLongArtist(): Observable<any> {
    return this.spotiService.getTopArtist('long').pipe(
      map(response => response.items)
    );
  }


  getArtistsNames(artists: any[]): string {
    return artists.map((a: { name: string }) => a.name).join(', ');
  }

  getGenresNames(genres: any[]): string {
    return genres.map((a: { name: string }) => a).join(', ');
  }
}
