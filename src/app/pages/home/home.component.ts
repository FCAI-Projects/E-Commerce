import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public productList : any;

  constructor (private api : ApiService) {
    this.api.getProduct()
    .subscribe(res => {
      this.productList = res;
    })
  }

  ngOnInit(): void {
  }

}
