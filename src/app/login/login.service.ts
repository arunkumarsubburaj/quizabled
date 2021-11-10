import { CoreConstants } from './../core.constants';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  login(data: { email: string; password: string }) {
    return this.http.post(environment.apiUrl + CoreConstants.login, data).pipe(
      tap((res: any) =>
        this.setSession({ idToken: res.token, expiresIn: res.expiresIn })
      ),
      shareReplay()
    );
  }
  logout() {
    sessionStorage.removeItem('id_token');
    sessionStorage.removeItem('expires_at');
    return this.http.get(environment.apiUrl + CoreConstants.logout);
  }
  private getUsers() {
    return this.http.get(environment.apiUrl + CoreConstants.users);
  }
  private setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    sessionStorage.setItem('id_token', authResult.idToken);
    sessionStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = sessionStorage.getItem('expires_at') as string;
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
