import { UserInfo, UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss'],
})
export class InstructionsComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}
  quizTitle: string = '';
  isMainQuiz: boolean = false;
  isCategoryD: boolean = false;
  ngOnInit() {
    this.userService.getLoginStatus().subscribe((status) => {
      if (!status) {
        this.router.navigateByUrl('/home');
      }
    });
    this.userService
      .getUser()
      .pipe(take(1))
      .subscribe((userData: UserInfo | {}) => {
        if (userData == {}) {
          this.router.navigateByUrl('/home');
        } else {
          this.isCategoryD = (userData as UserInfo).q_category == 'D';
          if (
            (userData as UserInfo).role == 'STUDENT' ||
            (userData as UserInfo).role == 'STUDENT_TEST'
          ) {
            this.isMainQuiz = true;
            this.quizTitle = 'Quizabled: Main Test';
          } else {
            this.quizTitle = 'Quizabled: Mock Test';
          }
        }
      });
  }
  gotoCategory() {
    this.router.navigateByUrl('/category');
  }
}
