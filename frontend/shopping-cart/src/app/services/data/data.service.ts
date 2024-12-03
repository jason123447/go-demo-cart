import { HttpBackend, HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from './models.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly http = inject(HttpClient);
  private readonly apiurl = 'http://127.0.0.1:8081'
  constructor(
    private handler: HttpBackend
  ) { }

  getUserById(id: number) {
    return this.http.get(`${this.apiurl}/user/${id}`);
  }

  getProducts() {
    return this.http.get<Product[]>(`${this.apiurl}/products`);
  }

  postProduct(product: Product) {
    return this.http.post(`${this.apiurl}/product`, product);
  }

  postProductByFormData() {
    const formData = new FormData();
    formData.append('name', 'post by formdata')
    formData.append('description', 'description')
    formData.append('price', '115599')
    // formData.append('img', this.imgInput!.nativeElement.files[0])
    const httpClient = new HttpClient(this.handler);
    return httpClient.post(`${this.apiurl}/product`, formData, {
      headers: {
        'enctype': `multipart/form-data`,
      }
    });
  }

  putProduct(product: Product) {
    return this.http.put(`${this.apiurl}/product`, product);
  }

  getProductImgById(id: number) {
    return this.http.get<Product>(`${this.apiurl}/product/img/${id}`);
  }

  postOrder() {
    this.http.post(`${this.apiurl}/order`, {
      user_id: 2,
      status: "Pending",
      total: 160,
      order_items: [
        {
          product_id: 50,
          quantity: 2,
          price: 160
        }
      ]
    }).subscribe()
  }

  fileToBase64(blob: Blob) {
    return new Observable<string>((sub) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onerror = err => sub.error(err);
      reader.onabort = err => sub.error(err);
      reader.onload = () => sub.next(reader.result as string);
      reader.onloadend = () => sub.complete();
      // reader.onprogress
    })
  }
}
