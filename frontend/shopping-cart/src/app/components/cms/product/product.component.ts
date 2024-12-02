import { ChangeDetectorRef, Component, ElementRef, inject, Inject, Optional, ViewChild } from '@angular/core';
import { NgMaterialModule } from '../../../modules/ng-material/ng-material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { DataService } from '../../../services/data/data.service';
import { PopupService } from '../../../services/popup.service';
import { LayoutService } from '../../../services/layout.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Product } from '../../../services/data/models.interface';

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
  @ViewChild('imgInput', { read: ElementRef }) imgInput?: ElementRef;
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
      return
    }
    const imgbase64 = await lastValueFrom(this.dataServ.fileToBase64(this.imgInput?.nativeElement.files[0]));
    const product: Product = { ...this.form.value } as any;
    product.img = imgbase64;
    this.layoutServ.appLoading = true;
    const res = await firstValueFrom(this.dataServ.postProduct(product)).catch(err => err);
    this.layoutServ.appLoading = false;
    if (res?.ok === false) return;
    this.popupServ.openSnackBar('Success !!');
    this.form.reset();
    this.imgInput!.nativeElement.value = '';
  }
}
