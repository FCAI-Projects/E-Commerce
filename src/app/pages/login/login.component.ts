import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  showSpinner: boolean = false;
  constructor(private router: Router, private api: ApiService) {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {}

  login(): void {
    if (this.email === '' || this.password === '') {
      alert('Please fill all fields');
    } else {
      this.showSpinner = true;
      this.api
        .loginUser({
          email: this.email,
          password: this.password,
        })
        .subscribe((res) => {
          if (res.token) {
            this.showSpinner = false;
            localStorage.setItem('token', res.token);
            this.router.navigate(['/']).then(() => {
              window.location.reload();
            });
          } else {
            this.showSpinner = false;
            alert('Invalid Username or Password');
          }
        });
    }
  }
}
