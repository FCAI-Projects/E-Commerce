import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http : HttpClient) { }

  getProduct(){
    return this.http.get<any>("http://api.goomlla.com:3006/product?page=1")
    .pipe(map((res:any) => {
      return res;
    }))
  }
}
