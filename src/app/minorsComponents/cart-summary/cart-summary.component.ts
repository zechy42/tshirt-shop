import { CartService } from './../../services/cart.service';
import { Cart } from './../../models/cart.model';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  private catrtSub: Subscription;

  cart: Cart[]  = [];

  constructor(public cartService: CartService) { }

  ngOnInit() {
    this.catrtSub = this.cartService.getCartUpdateListener().subscribe((cart: Cart[]) => {
      this.cart = cart;
      // console.log(products);
    });
    this.cartService.getCart();
  }

  getTotal() {
    let total = 0;
    for (let i = 0; i < this.cart.length; i++) {
      total += (this.cart[i].price * this.cart[i].quantity);
    }

    total *= 100;
    total = Math.round(total);
    total /= 100;
    return total;
  }

}
