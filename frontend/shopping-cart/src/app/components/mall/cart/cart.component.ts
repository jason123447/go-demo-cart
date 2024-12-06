import { Component, inject } from '@angular/core';
import { CartItem, CartService } from '../../../services/cart.service';
import { NgMaterialModule } from '../../../modules/ng-material/ng-material.module';
import { MatRippleModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedDirectiveModule } from '../../../directive/shared-directive.module';
import { DataService } from '../../../services/data/data.service';
import { LayoutService } from '../../../services/layout.service';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NgMaterialModule, MatRippleModule, FormsModule, SharedDirectiveModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartServ = inject(CartService);
  authServ = inject(AuthService);
  dataServ = inject(DataService);
  layoutServ = inject(LayoutService);
  total: number = 0.00;
  get cartItems() {
    return this.cartServ.cartItems;
  }

  set cartItems(cartItems: CartItem[]) {
    this.cartServ.cartItems = cartItems
  }

  onClickedModifyQuantity(item: CartItem, direction: number) {
    item.quantity += direction;
    if (item.quantity <= 1) {
      item.quantity = 1;
    }
    this.refreshCartItems();
  }

  onClickedRemoveCartItem(item: CartItem) {
    this.cartItems.splice(this.cartItems.findIndex(e => e === item), 1);
  }

  refreshCartItems() {
    this.cartItems = this.cartItems;
  }

  async onClickedCheckout() {
    this.layoutServ.appLoading = true;
    await lastValueFrom(this.dataServ.postOrder({
      user_id: this.authServ.user!.id,
      order_items: this.cartItems.map(e => (
        {
          product_id: e.id,
          quantity: e.quantity,
          price: e.price
        }
      ))
    })).catch(err => err);
    this.layoutServ.appLoading = false;

  }

}
