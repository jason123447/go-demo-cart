import { Component, inject, Inject, Optional } from '@angular/core';
import { NgMaterialModule } from '../../../modules/ng-material/ng-material.module';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { OrderItem, Product } from '../../../services/data/models.interface';
import { PopupService } from '../../../services/popup.service';
import { ProductDetailComponent } from '../../mall/product-detail/product-detail.component';

interface OrderItemWithProduct extends OrderItem {
  product?: Product
}
@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [NgMaterialModule],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent {
  popupServ = inject(PopupService)
  orders_items = [] as OrderItemWithProduct[];
  order_id?: number;
  total: string = '0'
  constructor(
    public dialogRef: DialogRef<string>,
    @Optional() @Inject(DIALOG_DATA) public data: any) {
  }
  ngOnInit(): void {
    const data = this.data
    if (data) {
      this.orders_items = data.orders_items;
      this.order_id = data.order_id;
      const total_num = this.orders_items.reduce((curr, next) => {
        return curr + (next.price! * next.quantity!)
      }, 0)
      this.total = total_num.toFixed(2)
    } else {
      this.dialogRef.close();
    }
  }

  onClickedShowProductDetail(item: OrderItemWithProduct) {
    this.popupServ.openProductDetail(item.product!)
  }


}
