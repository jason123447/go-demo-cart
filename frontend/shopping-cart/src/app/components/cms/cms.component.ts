import { Component, inject } from '@angular/core';
import { NgMaterialModule } from '../../modules/ng-material/ng-material.module';
import { PopupService } from '../../services/popup.service';
import { ProductComponent } from './product/product.component';

@Component({
  selector: 'app-cms',
  standalone: true,
  imports: [NgMaterialModule],
  templateUrl: './cms.component.html',
  styleUrl: './cms.component.scss'
})
export class CmsComponent {
  popupServ = inject(PopupService);

  onClickedAddProduct() {
    // this.popupServ.openSnackBar('test')
    const dialogRef = this.popupServ.openDialog(ProductComponent);
    
  }
}
