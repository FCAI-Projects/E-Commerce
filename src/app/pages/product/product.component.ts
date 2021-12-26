import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public id : string;
  public item : Object | undefined;

  constructor(private api : ApiService, private route: ActivatedRoute) {

    this.id = this.route.snapshot.paramMap.get('id')||'';
    this.api.getProductById(this.id)
    .subscribe(res => {
      this.item = res;
      console.log(this.item)
    })
  }

  ngOnInit(): void {
    
  }
}
