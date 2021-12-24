import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    
  }

  addtocart(item: any){
    this.cartService.addtoCart(item);
  }
}
