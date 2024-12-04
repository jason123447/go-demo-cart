import { Injectable } from '@angular/core';
import { Product } from './data/models.interface';
import { BehaviorSubject, tap } from 'rxjs';

export interface CartItem extends Product {
  quantity: number;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _cartItems = new BehaviorSubject([] as CartItem[]);
  // cartItems = [] as CartItem[];
  get cartItems() {
    return this._cartItems.value;
  }
  set cartItems(items: CartItem[]) {
    this._cartItems.next([...items]);
  }
  total: number = 0.00;
  constructor() {
    this._cartItems.pipe(tap(() => this.setTotalPrice())).subscribe();
  }

  getCartItemQuantity(id: number) {
    const item = this.cartItems.find(e => e.id === id)
    return item ? `(${item.quantity})` : '';
  }

  getCartItemsLengthDisplay() {
    return this.cartItems.length ? `(${this.cartItems.length})` : '';
  }

  setTotalPrice() {
    const total = this.cartItems.reduce((curr, next) => {
      curr.price += next.price! * next.quantity;
      return curr;
    }, { price: 0 }).price;
    this.total = Number(total.toFixed(2));
    return total;
  }
}
