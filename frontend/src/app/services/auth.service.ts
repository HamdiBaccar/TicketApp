import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private hostIp: string = environment.DJANGO_HOST_IP;

  private baseUrl = `http://${this.hostIp}:8000/api/auth/`;

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
  getUserProfileImage(): Observable<any> {
    // Make an HTTP GET request to fetch the user's profile image
    return this.http.get<any>(`${this.baseUrl}profile-image/`);
  }
  /*getUserStatus(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}user/status/`);
  }*/

  decodeJwtToken(token: string) {
    return this.jwtHelper.decodeToken(token);
  }
}
