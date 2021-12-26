import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: any;
  public totalPrice !: number ;
  public loading = true;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getCartItems()
    .subscribe(res=>{

      this.products = res;
      this.loading = false;
    })
  }
  // removeCartItem(item: any){
  //   this.cartService.removeCartItem(item);

  // }
  // emptyCart(){
  //   this.cartService.removeAllCart();
  // }

}
