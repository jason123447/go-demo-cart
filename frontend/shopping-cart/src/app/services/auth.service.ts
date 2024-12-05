import { inject, Injectable } from '@angular/core';
import { User } from './data/models.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin = true;
  private readonly http = inject(HttpClient);
  private readonly apiurl = 'http://127.0.0.1:8081'
  user?: User = {};
  constructor() { }

  postLogin(user: User) {
    return this.http.post<User>(`${this.apiurl}/login`, user);
  }
}
