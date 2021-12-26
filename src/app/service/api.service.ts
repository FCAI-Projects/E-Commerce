import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
=======
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });
  user_id: string = '';

  constructor(private http: HttpClient) {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(
      localStorage.getItem('token') || ''
    );
    this.user_id = decodedToken?._id;
  }

  getProduct() {
    return this.http
      .get<any>('http://api.goomlla.com:3006/product?page=1')
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  loginUser(user: Object) {
    return this.http
      .post<any>('http://api.goomlla.com:3006/user/login', user)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  registerUser(user: Object) {
    return this.http.post<any>('http://api.goomlla.com:3006/user', user).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getAllUsers() {
    return this.http
      .get<any>('http://api.goomlla.com:3006/user/all', {
        headers: this.headers,
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
