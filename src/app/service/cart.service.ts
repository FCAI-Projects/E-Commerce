import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {map} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList : any =[]
  public productList = new BehaviorSubject<any> ([]);
  getProducts(){
    return this.productList.asObservable();
  }
  setProduct(product: any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product: any){
    this.cartItemList.push(...product);
    this.productList.next(product);
    this.getTotalPrice();
  }
  getTotalPrice() :number{
    let totalPrice =0;
    this.cartItemList.map((a:any)=>{
      totalPrice +=a.total;
    })
    return totalPrice;
  }
  removeCartItem(product: any){
    this.cartItemList.map((a:any , index:any)=>{
      if(product.id === a.id)
        this.cartItemList.splice(index,1)
    })

  }
  removeAllCart(){
    this.cartItemList=[]
    this.productList.next(this.cartItemList);
  }
  constructor(private http: HttpClient) { }
  getCartItems(){
    return this.http.get<any>("http://api.goomlla.com:3006/cart")
    .pipe(map((res:any)=>{
      return res
    }))
  }
}
