import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interface/product';
import { ProdoctService } from 'src/app/service/prodoct.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  products: Product[] | undefined;
  sub!: Subscription;
  @Input() product!: Product;

  constructor(private srvProduct: ProdoctService) { }

  // getting the whole products list from database
  ngOnInit(): void {
    this.sub = this.srvProduct.getProductList().subscribe((productsData) => {
      this.products = productsData;
      console.log(this.products);
      console.log(this.products[0].id);
    });
  }

  ngOnDestroy(): void {
    //Before the instance is destroyed, stop the subscription
    this.sub.unsubscribe();
  }

}
