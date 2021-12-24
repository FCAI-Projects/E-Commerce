import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: any = [];
  public totalPrice !: number ;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.totalPrice = this.cartService.getTotalPrice();
    })

  }
  removeCartItem(item: any){
    this.cartService.removeCartItem(item);

  }
  emptyCart(){
    this.cartService.removeAllCart();
  }

}
