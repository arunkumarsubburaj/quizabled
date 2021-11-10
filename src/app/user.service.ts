import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  user$: BehaviorSubject<any> = new BehaviorSubject({});

  getUser() {
    return this.user$.asObservable();
  }
  setUser(userData: any) {
    this.user$.next(userData);
  }
}
