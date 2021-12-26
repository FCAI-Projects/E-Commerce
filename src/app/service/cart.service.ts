import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import {map} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class CartService {
  getProducts() {
    throw new Error('Method not implemented.');
  }
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  public cartItemList : any =[]
  public productList = new BehaviorSubject<any> ([]);

  constructor(private http: HttpClient) { }
  
  // getProducts(){
  //   return this.productList.asObservable();
  // }
  // setProduct(product: any){
  //   this.cartItemList.push(...product);
  //   this.productList.next(product);
  // }

  addtoCart(data: object){
    return this.http
      .post<any>('http://api.goomlla.com:3006/cart', data, {
        headers: this.headers
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  // getTotalPrice() :number{
  //   let totalPrice =0;
  //   this.cartItemList.map((a:any)=>{
  //     totalPrice +=a.total;
  //   })
  //   return totalPrice;
  // }
  // removeCartItem(product: any){
  //   this.cartItemList.map((a:any , index:any)=>{
  //     if(product.id === a.id)
  //       this.cartItemList.splice(index,1)
  //   })

  // }
  // removeAllCart(){
  //   this.cartItemList=[]
  //   this.productList.next(this.cartItemList);
  // }

  getCartItems(){
    return this.http.get<any>("http://api.goomlla.com:3006/cart" ,{
      headers: this.headers
    })
    .pipe(map((res:any)=>{
      return res;
      console.log(res)
    }))
  }
}
