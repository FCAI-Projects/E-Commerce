import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  getProducts() {
    throw new Error('Method not implemented.');
  }
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  public cartItemList: any = [];

  constructor(private http: HttpClient) {}

  addtoCart(data: object) {
    return this.http
      .post<any>('http://localhost:3006/cart', data, {
        headers: this.headers,
      })
      .subscribe();
  }

  getCartItems() {
    return this.http
      .get<any>('http://localhost:3006/cart', {
        headers: this.headers,
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
