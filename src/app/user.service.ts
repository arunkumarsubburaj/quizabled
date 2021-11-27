import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
export interface UserInfo {
  id: number;
  name: string;
  user_name: string;
  password: string;
  gender?: any;
  dob?: any;
  institution?: any;
  role: string;
  email: string;
  city: string;
  phone?: any;
  q_category?: any;
  age?: any;
  isAttended?: any;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  user$: BehaviorSubject<UserInfo | {}> = new BehaviorSubject({});
  isSignedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  getUser() {
    return this.user$.asObservable();
  }
  setUser(userData: UserInfo | {}) {
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
