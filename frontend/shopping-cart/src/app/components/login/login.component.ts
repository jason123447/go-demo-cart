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
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
  })

  ngOnInit() {
  }


  async onSubmit() {
    if (!this.loginForm.valid) {
      this.popupServ.openSnackBar('Invalid account or password');
      return;
    }
    this.layoutServ.appLoading = true;
    await firstValueFrom(this.authServ.postLogin(this.loginForm.value as any).pipe(tap(user => {
      this.authServ.user = user;
    }))).catch(err => err);
    this.layoutServ.appLoading = false;
    this.popupServ.openSnackBar('Login successfully !!');
    this.router.navigate(['/mall']);
  }
}
