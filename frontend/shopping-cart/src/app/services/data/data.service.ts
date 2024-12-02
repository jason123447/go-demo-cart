import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from './models.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly http = inject(HttpClient);
  private readonly apiurl = 'http://127.0.0.1:8081'
  constructor() { }

  getUserById(id: number) {
    return this.http.get(`${this.apiurl}/user/${id}`);
  }

  postProduct(product: Product) {
    return this.http.post(`${this.apiurl}/product`, product);
  }
}
