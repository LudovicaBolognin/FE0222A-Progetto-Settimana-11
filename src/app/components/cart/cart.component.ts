import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { NgForm, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interface/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart: Product[] | undefined;
  sub!: Subscription;
  totalPrice: number = 0;
  /* form!: FormGroup; */

  // right after the cart is empty
  endApp: number = 0;

  constructor(private srvCart: CartService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.endApp = 0;
    this.cart = this.srvCart.finalCart();
    this.sub = this.srvCart.subject.subscribe((total) => {
      if (total == 0) {
        this.cart = undefined;
      }
    });

    // total price
    for(let i=0; i < this.cart.length; i++) {
      this.totalPrice += this.cart[i].price;
    }

    // reactive form - form control
   /*  this.form = this.fb.group({
      infoClient: this.fb.group({
        name: this.fb.control(null, [Validators.required]),
        address: this.fb.control(null, [Validators.required]),
        email: this.fb.control(null, [Validators.required, Validators.email])
      })
    }); */
  }
  // form invalidation: shown in form properties
/* errorsInput(keyprop: string, error: string) {
  return this.form.get(keyprop)?.errors![error];
}
invalidInput(keyprop: string) {
  return this.form.get(keyprop);
} */

  // clear cart
  completeOrder(): void {
    this.srvCart.emptyCart();
    this.endApp++;
  }

  submitForm(form: NgForm) {
    this.completeOrder();
    form.resetForm();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
