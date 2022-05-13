import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  totalProducts: number = 0;
  sub!: Subscription;

  constructor(private srvCart: CartService) { }

  ngOnInit(): void {
    this.sub = this.srvCart.subject.subscribe((total: number) => {
      this.totalProducts = total;
    })
  }

}
