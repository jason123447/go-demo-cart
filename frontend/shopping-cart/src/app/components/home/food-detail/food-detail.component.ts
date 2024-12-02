import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, Optional } from '@angular/core';
import { NgMaterialModule } from '../../../modules/ng-material/ng-material.module';

@Component({
  selector: 'app-food-detail',
  standalone: true,
  imports: [NgMaterialModule],
  templateUrl: './food-detail.component.html',
  styleUrl: './food-detail.component.scss'
})
export class FoodDetailComponent {
  constructor(
    public dialogRef: DialogRef<string>,
    @Optional() @Inject(DIALOG_DATA) public data: any
  ) { 
    console.log(data);    
  }

}
