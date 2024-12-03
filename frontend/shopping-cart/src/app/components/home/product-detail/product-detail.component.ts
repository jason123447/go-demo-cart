import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, Optional } from '@angular/core';
import { NgMaterialModule } from '../../../modules/ng-material/ng-material.module';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NgMaterialModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  constructor(
    public dialogRef: DialogRef<string>,
    @Optional() @Inject(DIALOG_DATA) public data: any
  ) { 
    console.log(data);    
  }

}
