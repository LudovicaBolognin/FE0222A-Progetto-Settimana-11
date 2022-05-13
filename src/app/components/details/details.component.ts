import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interface/product';
import { ProdoctService } from 'src/app/service/prodoct.service';
import { ActivatedRoute, Params } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { Subscription } from 'rxjs';

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

    this.router.params.subscribe((params: Params) => {
      const id = +params['id'];
      this.getprod(id);
      console.log(this.productDetail);
    });
     /* this.route.params.subscribe( async (params) => {
      const id = +params['id'];
      this.productDetail = await this.srvProduct.getProduct(id).toPromise(); // Però è deprecato --> Trova un altro metodo
      console.log(this.productDetail);
    });
    console.log(this.productDetail); */
  }

  getprod(id: number) {
    this.srvProduct.getProduct(id).subscribe(prod => {
      this.productDetail = prod;
      console.log(this.productDetail);
      console.log(prod);
    });

  }

  addProd() {
    this.srvCart.addToCart(this.productDetail as Product); // cast se no undefined
  }

}
