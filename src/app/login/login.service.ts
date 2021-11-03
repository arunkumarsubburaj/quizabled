import { CoreConstants } from './../core.constants';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  login(data: { email: string; password: string }) {
    return this.http.post(environment.apiUrl + CoreConstants.login, data);
  }
  logout() {
    return this.http.get(environment.apiUrl + CoreConstants.logout);
  }
  getUsers() {
    return this.http.get(environment.apiUrl + CoreConstants.users);
  }
}
