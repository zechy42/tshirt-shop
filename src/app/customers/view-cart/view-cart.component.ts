import { User } from './../../models/user.model';
import { UserService } from './../../services/user.service';
import { Subscription } from 'rxjs';
import { CartService } from './../../services/cart.service';
import { Cart } from './../../models/cart.model';
import { Component, OnInit } from '@angular/core';
import {MatTable} from '@angular/material';
import * as $ from 'jquery';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {
  private catrtSub: Subscription;
  public userInfo = null;
  public shipping = null;
  public shippingCost = 0;
  public selectedShipping;

  cart: Cart[]  = [];
  displayedColumns = ['name', 'options', 'quantity', 'action', 'amount'];
  constructor(public cartService: CartService, public userService: UserService) { }

  ngOnInit() {
    this.catrtSub = this.cartService.getCartUpdateListener().subscribe((cart: Cart[]) => {
      this.cart = cart;
      // console.log(products);
    });
    this.cartService.getCart();
    this.userInfo = null;
    this.shipping = null;
    this.userService.getMyProfile().subscribe((user: User) => {
      this.userInfo = user;
      this.cartService.getShipping(this.userInfo.shipping_region_id).subscribe((shipping: any) => {
        this.shipping = shipping;
        this.shippingCost = shipping[0].shipping_cost;
      });
    });
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

  removeItem(item) {
    this.cartService.removeFromCart(item);
    return false;
  }

  changeShipping(s) {
    s = parseInt (s, 10);
    for (let i = 0; i < this.shipping.length; i++) {
      if ( s === this.shipping[i].shipping_id ) {
        this.shippingCost = this.shipping[i].shipping_cost;
      }
    }
  }

  updateElement(item) {
    const quantity = $('#c' + item.item_id).val();
    this.cartService.updateItem(item, quantity);
    // alert(quantity);
    // alert(JSON.stringify(item) + this.quantity);
  }

}
