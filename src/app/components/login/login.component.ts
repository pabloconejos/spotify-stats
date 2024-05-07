import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private spotifyClientId = environment.SPOTIFYCLIENTID;
  private spotifyClientSecret = environment.SPOTIFYCLIENTSECRET;
  private redirectUri = environment.REDIRECTURI;
  private scopes = 'user-top-read user-follow-read user-read-recently-played playlist-modify-public playlist-modify-private'

  //private redirectUri = 'http://localhost:4200/callback'; MI DESARROLLO
  constructor(private router: Router, private titulo: Title) {
    titulo.setTitle('Registrate')

  }

  iniciarSesion() {


    // URL de autenticación de Spotify
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${this.spotifyClientId}&response_type=code&redirect_uri=${this.redirectUri}&scope=${this.scopes}`;

    // Redireccionar al formulario de autenticación de Spotify
    window.location.href = authUrl;

  }



}
