import { Component, inject } from '@angular/core';
import { Order } from '../../services/data/models.interface';
import { DataService } from '../../services/data/data.service';
import { NgMaterialModule } from '../../modules/ng-material/ng-material.module';
import { LayoutService } from '../../services/layout.service';
import { firstValueFrom, lastValueFrom, tap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { paginatorConfig } from '../../config/paginator.config';
import { PopupService } from '../../services/popup.service';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NgMaterialModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  orders = [] as Order[]
  displayColumns = ["id", "status", "total", "created_at"]
  dataServ = inject(DataService)
  layoutServ = inject(LayoutService)
  popupServ = inject(PopupService)

  paginatorConfig = { ...paginatorConfig };

  ngOnInit() {
    this.initData();
  }

  async initData() {
    this.getOrders();
  }

  async onClickedRow(row: Order) {
    const ids = row.order_items!.map(e => e.product_id!)
    this.layoutServ.appLoading = true;
    const res = await firstValueFrom(this.dataServ.getProductsByIds(ids).pipe(tap(products => {
      const orderItems = row.order_items!.map(item => {
        const product = products.find(p => p.id === item.product_id) || null;
        return {
          ...item,
          product
        }
      })
      this.popupServ.openDialog(OrderDetailComponent, {
        data: {
          orders_items: orderItems,
          order_id: row.id
        }
      })
    }))).catch(err => err);
    this.layoutServ.appLoading = false;
  }

  async getOrders() {
    const page = this.paginatorConfig.page;
    const pageSize = this.paginatorConfig.pageSize;
    this.layoutServ.appLoading = true;
    const res = await firstValueFrom(this.dataServ.getOrders(page, pageSize).pipe(
      tap(res => {
        this.orders = res.data
        this.paginatorConfig.length = res.total;
      }))
    ).catch(err => err);
    this.layoutServ.appLoading = false;
    // if(res.ok === false) return;
  }

  onPageChanged(event: PageEvent) {
    this.paginatorConfig.page = event.pageIndex + 1;
    this.paginatorConfig.pageIndex = event.pageIndex;
    this.paginatorConfig.pageSize = event.pageSize;
    this.getOrders();
  }
}
