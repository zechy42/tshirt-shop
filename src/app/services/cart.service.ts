import { HttpClient } from '@angular/common/http';
import { Cart } from './../models/cart.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from './user.service';
import { Tshirt } from '../models/tshirt.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  uri = 'http://localhost:3000';
  private cart: Cart[] = [];
  private shippingCost = 0;

  private cartUpdated = new Subject<Cart[]>();

  constructor(private http: HttpClient, private userService: UserService) { }

  getCartUpdateListener() {
    return this.cartUpdated.asObservable();
  }

  addToCart(tshirt: Tshirt, attributes: String) {
    let c: Cart;
    const cartId = this.userService.getUserPayload().cartId;

    c = {
      item_id: 9999999999,
      name: tshirt.name,
      price: tshirt.price,
      attributes: attributes,
      quantity: 1,
      subtotal: tshirt.price,
    };

    this.cart[this.cart.length] = c;
    const url = `${this.uri}/cart/add/${cartId}`;

    const reqBody = {
      productId: tshirt.product_id,
      attributes: attributes
    };

    this.http.post<Cart[]>(url, reqBody).subscribe((cart: Cart[]) => {
      this.cart = cart;
      this.cartUpdated.next([...this.cart]);
    });
  }

  removeFromCart(cart: Cart) {
    const url = `${this.uri}/cart/${cart.item_id}`;

    this.http.delete<any>(url).subscribe((response) => {
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].item_id === cart.item_id) {
          this.cart.splice(i, 1);
        }
      }
      this.cartUpdated.next([...this.cart]);
    });
  }

  updateItem(cart: Cart, quantity) {
    const req = {
      quantity: quantity
    };
    const url = `${this.uri}/cart/update/${cart.item_id}`;

    this.http.put<any>(url, req).subscribe((response) => {
      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].item_id === cart.item_id) {
          this.cart[i].quantity = quantity;
          this.cart[i].subtotal = quantity * this.cart[i].price;
          this.cart[i].subtotal *= 100;
          this.cart[i].subtotal = Math.round(this.cart[i].subtotal);
          this.cart[i].subtotal /= 100;
          if (quantity < 1) {
            this.cart.splice(i, 1);
          }
        }
      }
      this.cartUpdated.next([...this.cart]);
    });
  }

  getCart() {
    const cartId = this.userService.getUserPayload().cartId;
    const url = `${this.uri}/cart/${cartId}`;
    this.http.get<Cart[]>(url).subscribe((cart: Cart[]) => {
      this.cart = cart;
      this.cartUpdated.next([...this.cart]);
    });
  }

  getShipping(regionId) {
    return this.http.get<any>(`${this.uri}/cart/shipping/${regionId}`);
  }

}
