import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartUrl = 'http://localhost:8000/carts/';

  constructor(private http: HttpClient) {}

  getCarts(): Observable<any[]> {
    return this.http.get<any[]>(this.cartUrl);
  }

  getCartDetails(cartId: number): Observable<any> {
    const url = `${this.cartUrl}${cartId}`;
    return this.http.get<any>(url);
  }

  addToCart(cartData: any): Observable<any> {
    return this.http.post<any>(this.cartUrl, cartData);
  }

  updateCart(cartId: number, cartData: any): Observable<any> {
    const url = `${this.cartUrl}${cartId}`;
    return this.http.put<any>(url, cartData);
  }

  deleteCart(cartId: number): Observable<any> {
    const url = `${this.cartUrl}${cartId}`;
    return this.http.delete<any>(url);
  }
}
