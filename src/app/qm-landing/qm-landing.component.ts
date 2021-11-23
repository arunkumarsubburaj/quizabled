import { QuizService } from '../quiz.service';
import { UserService } from './../user.service';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qm-landing',
  templateUrl: './qm-landing.component.html',
  styleUrls: ['./qm-landing.component.scss'],
})
export class QmLandingComponent implements OnInit, AfterContentInit {
  constructor(
    private userService: UserService,
    private quizService: QuizService,
    private router: Router
  ) {}
  user: any;
  ngOnInit() {}
  ngAfterContentInit(): void {
    if (window.sessionStorage.getItem('userData')) {
      this.user = JSON.parse(
        window.sessionStorage.getItem('userData') as string
      );
    }
  }
  gotoQuestions(type: string) {
    this.quizService.setQuestionType(type);
    this.router.navigateByUrl('/add-questions');
  }
}
