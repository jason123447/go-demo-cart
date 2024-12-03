import { ChangeDetectorRef, Component, ElementRef, inject, Inject, Optional, ViewChild } from '@angular/core';
import { NgMaterialModule } from '../../../modules/ng-material/ng-material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { DataService } from '../../../services/data/data.service';
import { PopupService } from '../../../services/popup.service';
import { LayoutService } from '../../../services/layout.service';
import { firstValueFrom, lastValueFrom, tap } from 'rxjs';
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
    description: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda totam amet asperiores commodi blanditiis error.', Validators.required],
    price: [0, Validators.min(0)]
  });
  dataServ = inject(DataService);
  popupServ = inject(PopupService);
  layoutServ = inject(LayoutService);
  imgBase64 = '';
  @ViewChild('imgInput', { read: ElementRef }) imgInput?: ElementRef;
  isEdit = false;
  constructor(
    public cd: ChangeDetectorRef,
    public dialogRef: DialogRef<string>,
    @Optional() @Inject(DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.initData();
  }

  async initData() {
    if (this.data) {
      this.isEdit = true;
      Object.entries(this.data).forEach(([key, value]) => {
        const formCtrl = this.form.controls[key];
        if (formCtrl) {
          formCtrl.setValue(value);
        }
      });
      this.layoutServ.appLoading = true;
      await firstValueFrom(this.dataServ.getProductImgById(this.data.id).pipe(tap(res => {
        this.imgBase64 = res.img!
      })))
      this.layoutServ.appLoading = false;
    }
  }

  async selectFile(_: Event) {
    const file = this.imgInput?.nativeElement.files[0];
    if (file) {
      const imgbase64 = await lastValueFrom(this.dataServ.fileToBase64(file));
      this.imgBase64 = imgbase64;
    } else {
      this.imgBase64 = '';
    }
  }

  async setImgbase64(product: Product) {
    product.img = this.imgBase64;
  }

  async onClickedAddProduct() {
    if (this.form.invalid) {
      this.popupServ.openSnackBar('Invalid data');
      return
    }
    const product = { ...this.form.value } as Product;
    await this.setImgbase64(product);
    this.layoutServ.appLoading = true;
    const res = await firstValueFrom(this.dataServ.postProduct(product)).catch(err => err);
    this.layoutServ.appLoading = false;
    if (res?.ok === false) return;
    this.popupServ.openSnackBar('Success !!');
    this.form.reset();
    this.imgInput!.nativeElement.value = '';
    this.imgBase64 = '';
  }

  async onClickedEditProduct() {
    if (this.form.invalid) {
      this.popupServ.openSnackBar('Invalid data')
      return
    }
    const product = { ...this.form.value, id: this.data.id } as Product;
    await this.setImgbase64(product);
    this.layoutServ.appLoading = true;
    const res = await firstValueFrom(this.dataServ.putProduct(product)).catch(err => err);
    this.layoutServ.appLoading = false;
    if (res?.ok === false) return;
    this.popupServ.openSnackBar('Success !!');
  }

}
