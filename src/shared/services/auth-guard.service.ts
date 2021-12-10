import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    const isDemoUser = window.sessionStorage.getItem('isDemoUser');
    if (!this.auth.isAuthenticated() && !isDemoUser) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
