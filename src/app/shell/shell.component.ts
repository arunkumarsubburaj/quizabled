import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit, AfterViewInit {
  isLoggedIn: boolean = false;
  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private router: Router
  ) {}
  user: any;
  isDemoUser: boolean = false;
  ngOnInit() {}
  ngAfterViewInit() {
    if (window.sessionStorage.getItem('userData')) {
      this.user = JSON.parse(
        window.sessionStorage.getItem('userData') as string
      );
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
    if (window.sessionStorage.getItem('isDemoUser') == 'true') {
      this.isDemoUser = true;
    }
  }
  logout() {
    this.router.navigateByUrl('/');
    window.sessionStorage.removeItem('ROLE');
    window.sessionStorage.removeItem('userData');
    window.sessionStorage.removeItem('isDemoUser');
    this.isLoggedIn = false;
    this.isDemoUser = false;
    this.loginService.logout();
    this.userService.setUser({});
  }
  goToDemo() {
    window.sessionStorage.setItem('isDemoUser', 'true');
    this.isDemoUser = true;
    this.router.navigateByUrl('/instructions');
  }
}
