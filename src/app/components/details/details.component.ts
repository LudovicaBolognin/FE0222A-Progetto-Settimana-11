import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interface/product';
import { ProdoctService } from 'src/app/service/prodoct.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  productDetail!: Product | undefined;
  sub!: Subscription;

  constructor(private router: ActivatedRoute, private srvProduct: ProdoctService, private srvCart: CartService) { }

// da inserire funzione per aggiungere al carrello

  ngOnInit(): void {

 //add the product id param to the route params
    this.sub = this.router.params.subscribe((params: Params) => {
      const id = +params['id'];
      this.selectProd(id);
      console.log(this.productDetail);
    });
     /* this.route.params.subscribe( async (params) => {
      const id = +params['id'];
      this.productDetail = await this.srvProduct.getProduct(id).toPromise(); // Però è deprecato --> Trova un altro metodo
      console.log(this.productDetail);
    });
    console.log(this.productDetail); */
  }

// get the selected product (by id) from service
  selectProd(id: number) {
    this.srvProduct.getProduct(id).subscribe(prod => {
      this.productDetail = prod;
      console.log(this.productDetail);
    });

  }

  addProd() {
    this.srvCart.addToCart(this.productDetail as Product); // cast or undefined
    console.log(this.productDetail);
  }

}
