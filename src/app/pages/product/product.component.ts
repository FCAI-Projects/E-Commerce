import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  id: string;
  item: any;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.api.getProductById(this.id).subscribe((res) => {
      this.item = res;
      console.log(this.item);
    });
  }

  ngOnInit(): void {}

  addtocart() {
    if (localStorage.getItem('token')) {
      this.cartService.addtoCart({
        product: this.id,
      });
      this.toastr.success('Product has been Added!', 'Success');
    } else {
      this.router.navigate(['/login']);
    }
  }
}
