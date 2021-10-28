import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private toastrService: ToastrService) {}
  auth = getAuth();
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
      signInWithEmailAndPassword(
        this.auth,
        this.fc.email.value,
        this.fc.password.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          this.toastrService.success('Logged In Successfully.', 'Success');
          // ...
        })
        .catch((err) => {
          const errorCode = err.code;
          const errorMessage = err.message;
          this.toastrService.error(errorCode, 'Error');
        });
    }
  }
}
