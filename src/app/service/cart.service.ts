import { Injectable } from '@angular/core';
import { Product } from '../interface/product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Product[] = [];

  // subject to update cart items
  subject = new Subject<number>();

  constructor() { }

  //select the product to add it to my cart
  addToCart(product: Product) {
    this.cart = [...this.cart, product];
    this.subject.next(this.cart.length);
  }

  finalCart() {
    return this.cart;
  }

  //empty the cart and reset the messsage of the subject to 0
  emptyCart() {
    this.cart = [];
    this.subject.next(0);
  }

}
