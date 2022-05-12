import { Injectable } from '@angular/core';
import { Product } from '../interface/product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

cart: Product[] = [];

sbj = new Subject<number>();

  constructor() { }

  //select the product to add to my cart
  addToCart(product: Product) {
    console.log(this.cart);
    this.cart = [...this.cart, product]; // passa il prodotto
    //sent to all components
    this.sbj.next(this.cart.length); // da controllare <___<
    console.log(this.cart);
  }

  finalCart() {
    return this.cart;
  }

  //empty the cart and reset the messsage of the subject to cart.lenght=0
  emptyCart() {
    this.cart = [];
    this.sbj.next(0);
  }
}
