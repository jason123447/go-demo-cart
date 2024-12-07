import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgMaterialModule } from '../../modules/ng-material/ng-material.module';
import { LayoutService } from '../../services/layout.service';
import { PopupService } from '../../services/popup.service';
import { firstValueFrom, tap } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgMaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authServ = inject(AuthService);
  layoutServ = inject(LayoutService);
  popupServ = inject(PopupService);
  router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('test123', [Validators.required/* , Validators.email */]),
    password: new FormControl('test123', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(16)])
  })

  ngOnInit() {
  }


  async onSubmit() {
    if (!this.loginForm.valid) {
      this.popupServ.openSnackBar('Invalid account or password');
      return;
    }
    this.layoutServ.appLoading = true;
    const res = await this.authServ.login(this.loginForm.value as any);
    this.layoutServ.appLoading = false;
    if(res.ok === false) return;
    this.popupServ.openSnackBar('Login successfully !!');
    this.router.navigate(['/mall']);
  }

  // onClickedRegister() {
  //   // console.log('register');
  // }
}
