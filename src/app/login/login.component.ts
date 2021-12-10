import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  constructor(
    private toastrService: ToastrService,
    private loginService: LoginService,
    private router: Router,
    private userService: UserService
  ) {}
  userData!: any;
  loginForm = new FormGroup({
    user_name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  ngOnInit() {}
  ngAfterViewInit() {
    if (window.sessionStorage.getItem('userData')) {
      const res = JSON.parse(
        window.sessionStorage.getItem('userData') as string
      );
      this.userService.setUser(res);
      window.sessionStorage.setItem('ROLE', res.role);
      this.launchLandingPage(res.role);
    }
  }
  get fc() {
    return this.loginForm.controls;
  }
  signIn() {
    if (this.loginForm.invalid) {
    } else {
      const data: { user_name: string; password: string } = {
        user_name: this.fc.user_name.value,
        password: this.fc.password.value,
      };
      this.loginService.login(data).subscribe(
        (res: any) => {
          this.toastrService.success('Logged In Successfully.', 'Success');
          this.userService.setUser(res.user);
          this.userData = res.user;
          this.userService.setLoginStatus(true);
          window.sessionStorage.setItem('ROLE', res.user.role);
          this.launchLandingPage(res.user.role);
        },
        (err) => {
          const errorCode = err.error.code;
          const errorMessage = err.error.message;
          this.toastrService.error(errorMessage, 'Error');
        }
      );
    }
  }
  launchLandingPage(role: string) {
    switch (role) {
      case 'ADMIN':
        this.router.navigateByUrl('/admin');
        break;
      case 'STUDENT':
        if (this.userData.isAttended == 1) {
          this.router.navigateByUrl('/contact-admin', {
            state: { quizStatus: 1 },
          });
        } else if (this.userData.isAttended == 2) {
          this.router.navigateByUrl('/contact-admin', {
            state: { quizStatus: 2 },
          });
        } else {
          this.router.navigateByUrl('/instructions');
        }
        break;
      case 'QUIZ_MASTER':
        this.router.navigateByUrl('/quiz-master');
        break;

      default:
        break;
    }
  }
  cancel() {
    this.router.navigateByUrl('/home');
  }
}
