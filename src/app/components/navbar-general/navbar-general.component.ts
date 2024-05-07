import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar-general',
  templateUrl: './navbar-general.component.html',
  styleUrls: ['./navbar-general.component.css']
})
export class NavbarGeneralComponent {


  constructor(private router: Router) {
  }

  log_out() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}
