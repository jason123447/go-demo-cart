import { ChangeDetectorRef, Component, Inject, Optional } from '@angular/core';
import { NgMaterialModule } from '../../../modules/ng-material/ng-material.module';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgMaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  form = new FormGroup({

  });
  constructor(
    public cd: ChangeDetectorRef,
    public dialogRef: DialogRef<string>,
    @Optional() @Inject(DIALOG_DATA) public data: any,
  ) { 
    console.log(data);    
  }

  selectFiles(event:any) {
    console.log(event);
    
  }
}
