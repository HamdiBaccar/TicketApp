import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/api/auth/'; // Replace this with your Django backend URL

  constructor(private http: HttpClient,private jwtHelper: JwtHelperService) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}login/`, credentials);
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}register/`, userData);
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}logout/`, {});
  }

  /*getUserStatus(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}user/status/`);
  }*/

  decodeJwtToken(token: string) {
    return this.jwtHelper.decodeToken(token);
  }
}
