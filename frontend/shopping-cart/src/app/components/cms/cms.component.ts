import { Component, inject } from '@angular/core';
import { NgMaterialModule } from '../../modules/ng-material/ng-material.module';
import { PopupService } from '../../services/popup.service';
import { ProductComponent } from './product/product.component';
import { DataService } from '../../services/data/data.service';
import { lastValueFrom, tap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../services/data/models.interface';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-cms',
  standalone: true,
  imports: [NgMaterialModule],
  templateUrl: './cms.component.html',
  styleUrl: './cms.component.scss'
})
export class CmsComponent {

  popupServ = inject(PopupService);
  dataServ = inject(DataService);
  layoutServ = inject(LayoutService)
  displayColumns = ["id", "name", "description", "price", "stock"];
  products = new MatTableDataSource([] as Product[])
  ngOnInit() {
    this.initData();
  }

  async initData() {
    this.layoutServ.appLoading = true;
    await lastValueFrom(this.dataServ.getProducts().pipe(tap(res => {
      this.products = new MatTableDataSource(res);
    }))).catch(err => err);
    this.layoutServ.appLoading = false;
  }

  onClickedAddProduct() {
    this.openProductDialog();
  }
  
  onClickedRow(row: Product) {
    this.openProductDialog(row);
  }

  openProductDialog(product?: Product) {
    const dialogRef = this.popupServ.openDialog(ProductComponent, {
      data: product
    });
    dialogRef.afterClosed().pipe(tap(() => this.initData())).subscribe();
  }

}
