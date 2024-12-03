import { Component, inject } from '@angular/core';
import { NgMaterialModule } from '../../modules/ng-material/ng-material.module';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-mall',
  standalone: true,
  imports: [NgMaterialModule, CdkDrag, CdkDragHandle],
  templateUrl: './mall.component.html',
  styleUrl: './mall.component.scss'
})
export class MallComponent {
  popupServ = inject(PopupService);

  foodlist = [
    "assets/foods/pexels-avichal-lodhi-1054429-2819088.jpg",
    "assets/foods/pexels-valeriya-1148087.jpg",
    "assets/foods/pexels-wendyaffieplaas-1178610.jpg",
    "assets/foods/pexels-cottonbro-3338500.jpg",
    "assets/foods/pexels-cottonbro-3296391.jpg",
    "assets/foods/pexels-edwardeyer-687824.jpg",
    "assets/foods/pexels-goumbik-618775.jpg",
    "assets/foods/pexels-harry-dona-2338407.jpg",
    "assets/foods/pexels-jeshoots-3688.jpg",
    "assets/foods/pexels-mali-65175.jpg",
    "assets/foods/pexels-pixabay-60616.jpg",
    "assets/foods/pexels-pixabay-361184.jpg",
    "assets/foods/pexels-rajesh-tp-749235-1600727.jpg",
    "assets/foods/pexels-samerdaboul-2233729.jpg",
    "assets/foods/pexels-teejay-1362534.jpg",
    "assets/foods/pexels-valeriya-1332267.jpg",
  ]

  openProductDetail(product: any) {
    const dialogRef = this.popupServ.openDialog(ProductDetailComponent)
  }
}
