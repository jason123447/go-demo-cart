import { Component, inject } from '@angular/core';
import { CartItem, CartService } from '../../../services/cart.service';
import { NgMaterialModule } from '../../../modules/ng-material/ng-material.module';
import { MatRippleModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NgMaterialModule, MatRippleModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartServ = inject(CartService);
  get cartItems() {
    return this.cartServ.cartItems;
  }

  set cartItems(cartItems: any[]) {
    this.cartServ.cartItems = cartItems
  }

  onClickedModifyQuantity(item: CartItem, direction: number) {
    item.quantity += direction;
    if(item.quantity <= 0) {
      item.quantity = 0;
    }
  }

  onClickedRemoveCartItem(item: CartItem) {
    this.cartItems.splice(this.cartItems.findIndex(e => e === item), 1);
  }

}
