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
  }
  logout() {
    this.router.navigateByUrl('/');
    window.sessionStorage.removeItem('ROLE');
    window.sessionStorage.removeItem('userData');
    this.isLoggedIn = false;
    this.loginService.logout();
    this.userService.setUser({});
  }
}
