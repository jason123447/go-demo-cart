import { Component, inject } from '@angular/core';
import { NgMaterialModule } from '../../modules/ng-material/ng-material.module';
import { PopupService } from '../../services/popup.service';
import { ProductComponent } from './product/product.component';
import { DataService } from '../../services/data/data.service';
import { tap } from 'rxjs';

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
  ngOnInit() {
    // this.dataServ.getUserById(2).pipe(tap(res => {
    //   console.log(res);
    // })).subscribe()
    // this.dataServ.postProduct({
    //   name: 'client sample product',
    //   description: 'some text',
    //   price: 5566
    // }).subscribe()
  }
  onClickedAddProduct() {
    // this.popupServ.openSnackBar('test')
    const dialogRef = this.popupServ.openDialog(ProductComponent);

  }
}
