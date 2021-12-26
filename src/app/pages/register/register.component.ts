import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide: boolean = false;
  fname: string = '';
  lname: string = '';
  email: string = '';
  password: string = '';
  showSpinner: boolean = false;

  constructor(private router: Router, private api: ApiService) {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {}

  register(): void {
    this.api
      .registerUser({
        name: this.fname + ' ' + this.lname,
        email: this.email,
        password: this.password,
        role: 'buyer',
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
          alert('Invalid Data');
        }
      });
  }
}
