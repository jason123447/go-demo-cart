import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgMaterialModule } from '../../modules/ng-material/ng-material.module';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgMaterialModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authService = inject(AuthService);



  loginForm = new FormGroup({
    account: new FormControl('', [Validators.required, Validators.pattern(/^[\w\s]+$/)]),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}')])
  })

  ngOnInit() {
  }


  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }

    console.log(this.loginForm.value);
    this.loginForm.reset();
    alert('Login Successfully');
  }
}
