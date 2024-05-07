import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // Obtener el código de autorización de la URL
    const authorizationCode = this.getAuthorizationCodeFromUrl();

    // Intercambiar el código de autorización por un token de acceso
    this.exchangeAuthorizationCode(authorizationCode).then((accessToken) => {
      // Guardar el token de acceso en el almacenamiento local
      console.log('TOKEN CALLBACK: '+accessToken)
      localStorage.setItem('access_token', accessToken);

      // Redirigir a la página de lista de canciones
      this.router.navigate(['/home']);
    });
  }

  getAuthorizationCodeFromUrl(): string {
    return this.route.snapshot.queryParamMap.get('code') || 'null';
  }

  exchangeAuthorizationCode(authorizationCode: string): Promise<string> {
    const clientId = '16c30af555714db1997a059eca365a3b';
    const clientSecret = '03d021c3adee480197ef438852209ccf';
    const redirectUri = 'https://musicnumbers-f4704.web.app/callback'; // Asegúrate de que coincida con la URL de redirección configurada en tu aplicación de Spotify
    //const redirectUri = 'http://localhost:4200/callback'; // Asegúrate de que coincida con la URL de redirección configurada en tu aplicación de Spotify

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
    });

    const body = `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${encodeURIComponent(redirectUri)}`;

    return this.http.post<any>('https://accounts.spotify.com/api/token', body, { headers })
      .toPromise()
      .then(response => response.access_token);
  }

}


