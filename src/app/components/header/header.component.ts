import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor() {
    if (localStorage.getItem('token')) this.isLoggedIn = true;
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(
      localStorage.getItem('token') || ''
    );
    if (decodedToken?.role === 'admin') {
      this.isAdmin = true;
    }
  }

  ngOnInit(): void {}

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    window.location.reload();
  }
}
