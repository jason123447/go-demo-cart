import { Injectable } from '@angular/core';
import { Product } from './data/models.interface';

export interface CartItem extends Product {
  quantity: number;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = [] as CartItem[];
  constructor() { }

  getCartItemQuantity(id: number) {
    const item = this.cartItems.find(e => e.id === id)
    return item ? `(${item.quantity})` : '';
  }
}
