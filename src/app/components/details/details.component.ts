import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interface/product';
import { ProdoctService } from 'src/app/service/prodoct.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  product: Product | undefined;

  constructor(private srvProduct: ProdoctService, private srvCart: CartService, private route: ActivatedRoute) { }

// da inserire funzione per aggiungere al carrello

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      const id = +params['id'];
      this.product = await this.srvProduct.getProduct(id).toPromise(); // Però è deprecato --> Trova un altro metodo
    });
  }

  addProd() {
    this.srvCart.addToCart(this.product as Product); // cast se no undefined
  }

}
