import { inject, Injectable } from '@angular/core';
import { User } from './data/models.interface';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, tap } from 'rxjs';
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiurl = 'https://go-demo-cart.onrender.com'
  popupServ = inject(PopupService);
  user?: User = {};
  constructor() { }

  postLogin(user: User) {
    return this.http.post<User>(`${this.apiurl}/login`, user);
  }

  async login(loginUser: User) {
    const res = await firstValueFrom(this.postLogin(loginUser).pipe(tap(user => {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(this.user));
    }))).catch(err => err)
    if (res.ok === false) {
      this.popupServ.openSnackBar(res.error.error);
    }
    return res;
  }

  logout() {
    localStorage.clear();
    location.reload();
  }
}
