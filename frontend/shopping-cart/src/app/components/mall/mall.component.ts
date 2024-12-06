import { Component, inject } from '@angular/core';
import { NgMaterialModule } from '../../modules/ng-material/ng-material.module';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { PopupService } from '../../services/popup.service';
import { LayoutService } from '../../services/layout.service';
import { DataService } from '../../services/data/data.service';
import { firstValueFrom, tap } from 'rxjs';
import { Product } from '../../services/data/models.interface';
import { CartService } from '../../services/cart.service';
import { CartComponent } from './cart/cart.component';

@Component({
  selector: 'app-mall',
  standalone: true,
  imports: [NgMaterialModule],
  templateUrl: './mall.component.html',
  styleUrl: './mall.component.scss'
})
export class MallComponent {
  popupServ = inject(PopupService);
  layoutServ = inject(LayoutService);
  dataServ = inject(DataService);
  cartServ = inject(CartService);

  productList: Product[] = [];

  openProductDetail(product: Product) {
    this.popupServ.openProductDetail(product)
  }

  ngOnInit() {
    this.initData();

  }

  async initData() {
    this.layoutServ.appLoading = true;
    await firstValueFrom(this.dataServ.getProducts().pipe(tap(res => {
      this.productList = res;
    }))).catch(err => err)
    this.layoutServ.appLoading = false;
  }

  onClickedOpenCart() {
    if (!this.cartServ.cartItems.length) return;
    this.cartServ.cartItems = this.cartServ.cartItems;
    const dialogRef = this.popupServ.openDialog(CartComponent);
  }

  onClickedAddToCart(product: Product, event: Event) {
    // event.preventDefault();
    event.stopPropagation();
    const cartItems = this.cartServ.cartItems;
    const idx = cartItems.findIndex(e => e.id === product.id);
    if (idx !== -1) {
      cartItems[idx].quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }
  }
}
