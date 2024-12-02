import { ChangeDetectorRef, Component, inject, Inject, Optional } from '@angular/core';
import { NgMaterialModule } from '../../../modules/ng-material/ng-material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { DataService } from '../../../services/data/data.service';
import { PopupService } from '../../../services/popup.service';
import { LayoutService } from '../../../services/layout.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgMaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  fb = inject(FormBuilder)
  form = this.fb.group({
    name: ['', Validators.required],
    description: ['Hello', Validators.required],
    price: [0, Validators.min(0)]
  });
  dataServ = inject(DataService);
  popupServ = inject(PopupService);
  layoutServ = inject(LayoutService);
  isEdit = false;
  constructor(
    public cd: ChangeDetectorRef,
    public dialogRef: DialogRef<string>,
    @Optional() @Inject(DIALOG_DATA) public data: any,
  ) {
    if (data) {
      this.isEdit = true;
    }
  }

  selectFiles(event: any) {
    console.log(event);
  }

  async onClickedAddProduct() {
    if (this.form.invalid) {
      this.popupServ.openSnackBar('Invalid data');
    }
    this.layoutServ.appLoading = true;
    const res = await firstValueFrom(this.dataServ.postProduct(this.form.value as any)).catch(err => err);
    this.layoutServ.appLoading = false;
    if (res?.ok === false) return;
    this.popupServ.openSnackBar('Success !!');
  }
}
