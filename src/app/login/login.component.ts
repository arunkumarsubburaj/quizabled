import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs/operators';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private toastrService: ToastrService,
    private loginService: LoginService
  ) {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  ngOnInit() {}
  get fc() {
    return this.loginForm.controls;
  }
  signIn() {
    if (this.loginForm.invalid) {
    } else {
      const data: { email: string; password: string } = {
        email: this.fc.email.value,
        password: this.fc.password.value,
      };
      this.loginService
        .login(data)
        .pipe(delay(2000))
        .subscribe(
          (res) => {
            const user = res;
            console.log(user);
            this.toastrService.success('Logged In Successfully.', 'Success');
          },
          (err) => {
            const errorCode = err.error.code;
            const errorMessage = err.error.message;
            this.toastrService.error(errorMessage, 'Error');
          }
        );
    }
  }
}
