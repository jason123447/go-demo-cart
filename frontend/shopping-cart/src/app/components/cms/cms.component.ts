import { Component, inject } from '@angular/core';
import { NgMaterialModule } from '../../modules/ng-material/ng-material.module';
import { PopupService } from '../../services/popup.service';
import { ProductComponent } from './product/product.component';
import { DataService } from '../../services/data/data.service';
import { tap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../services/data/models.interface';

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
  displayColumns = ["id", "name", "description", "price", "stock"];
  products = [] as Product[]
  ngOnInit() {
    this.dataServ.getProducts().pipe(tap(res => {
      this.products = res;
    })).subscribe();
  }
  onClickedAddProduct() {
    // this.popupServ.openSnackBar('test')
    const dialogRef = this.popupServ.openDialog(ProductComponent);

  }
}
