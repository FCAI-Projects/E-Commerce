import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface usersInterface {
  _id: string;
  name: number;
  email: number;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  users: usersInterface[] = [];
  displayedColumns: string[] = ['_id', 'name', 'email'];

  constructor(private router: Router, private api: ApiService) {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(
      localStorage.getItem('token') || ''
    );
    if (decodedToken.role === 'admin') {
      this.api.getAllUsers().subscribe((res) => {
        this.users = res;
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {}
}
