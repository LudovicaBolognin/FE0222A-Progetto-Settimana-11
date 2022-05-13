import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form!: FormGroup;

  constructor(private srvCart: CartService, public fb: FormBuilder) {
    this.form = fb.group({
      'name': ['', Validators.required],
      'address': ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.cart = this.srvCart.finalCart();
    this.sub = this.srvCart.subject.subscribe((total) => {
      if (total == 0) {
        this.cart = undefined;
      }
    });
  }

  completeOrder(): void {
    /* if(!this.form.valid) {
      alert('Form non valido: compila tutti i campi');
    } else {
      alert('Il tuo ordine è andato a buon fine!');
    } */
    console.log(this.form.controls['name'].value);
    this.srvCart.emptyCart();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
