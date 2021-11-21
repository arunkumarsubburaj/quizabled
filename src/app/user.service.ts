import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  user$: BehaviorSubject<any> = new BehaviorSubject({});
  isSignedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  getUser() {
    return this.user$.asObservable();
  }
  setUser(userData: any) {
    // window.sessionStorage.setItem('userData', userData);
    this.user$.next(userData);
  }
  getLoginStatus() {
    return this.isSignedIn$.asObservable();
  }
  setLoginStatus(status: boolean) {
    this.isSignedIn$.next(status);
  }
}
