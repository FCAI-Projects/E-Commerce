import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public productList : any;

  constructor (private api : ApiService, private cartService : CartService, private router: Router, private toastr: ToastrService) {
    this.api.getProduct()
    .subscribe(res => {
      this.productList = res;
    })
  }

  ngOnInit(): void {
  }

  addtocart(id:string){
    if(localStorage.getItem('token')){
      this.cartService.addtoCart({
        product: id
      });
      this.toastr.success('Product has been Added!', 'Success');
    }
    else {
      this.router.navigate(['/login']);
    }
  }

}
