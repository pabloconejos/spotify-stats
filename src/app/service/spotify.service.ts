import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Artist, PlayList, Respuesta, Song} from "../common/interfaces";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private _httpClient: HttpClient) {
    this.upDateToken();
  }


  public credentials = {

    clientId: '16c30af555714db1997a059eca365a3b',
    clientSecret: '03d021c3adee480197ef438852209ccf',
    accessToken: ''

  };

  upDateToken(){
    this.credentials.accessToken = sessionStorage.getItem('acces_token') || '';
  }

  getTopTracks(timeRange: string): Observable<Respuesta> {
    var accessToken = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + accessToken
    });

    //https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=32
    const url = `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}_term&limit=50`;

    return this._httpClient.get<any>(url, { headers });
  }


  getTopArtist(timeRange: string): Observable<Respuesta> {
    var accessToken = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + accessToken
    });

    const url = `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}_term&limit=50`;

    return this._httpClient.get<any>(url, { headers });
  }


  getSong(song: string): Observable<Song> {
    var accessToken = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + accessToken
    });

    return this._httpClient.get<any>('https://api.spotify.com/v1/tracks/'+song, { headers });
  }


  getArtist(artist: string): Observable<Artist> {
    var accessToken = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + accessToken
    });

    return this._httpClient.get<any>('https://api.spotify.com/v1/artists/'+artist, { headers });
  }


  getRecentlyPlayed(): Observable<any>{
    var accessToken = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + accessToken
    });

    return this._httpClient.get<any>('https://api.spotify.com/v1/me/player/recently-played', { headers });
  }

  getUser(): Observable<any>{
    var accessToken = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + accessToken
    });

    return this._httpClient.get<any>('https://api.spotify.com/v1/me', { headers });
  }


  getPlaylists(id : string): Observable<Respuesta>{
    var accessToken = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + accessToken
    });

    return this._httpClient.get<any>('https://api.spotify.com/v1/users/'+id+'/playlists', { headers });
  }


  getOnePlaylist(id : string): Observable<PlayList>{
    var accessToken = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + accessToken
    });

    return this._httpClient.get<any>(' https://api.spotify.com/v1/playlists/'+id, { headers });
  }

  getRecomendedSongs(topTracksIds : string[]): Observable<any>{
    var accessToken = localStorage.getItem('access_token');

    const seedTracks = topTracksIds.join(',');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + accessToken
    });

    return this._httpClient.get<any>('https://api.spotify.com/v1/recommendations?seed_tracks='+seedTracks, { headers });
  }


  createPlaylist(userId: string, name: string, description: string): Observable<any> {
    var accessToken = localStorage.getItem('access_token');

    const body = {
      name,
      description,
      public: false,
    };
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + accessToken
    });

    return this._httpClient.post(`https://api.spotify.com/v1/users/${userId}/playlists`, body, { headers });
  }

  addTracksToPlaylist(playlistId: string, trackUris: string[]): Observable<any> {
    var accessToken = localStorage.getItem('access_token');
    const body = {
      uris: trackUris,
    };
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + accessToken
    });

    return this._httpClient.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, body, { headers });
  }










}
