import { QuestionService } from './../question.service';
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
    private questionService: QuestionService,
    private router: Router
  ) {}
  user: any;
  ngOnInit() {}
  ngAfterContentInit(): void {
    this.userService.getUser().subscribe((res) => {
      this.user = res;
    });
  }
  gotoQuestions(type: string) {
    switch (type) {
      case 'demo':
        this.questionService.setQuestionType(type);
        break;

      default:
        break;
    }
    this.router.navigateByUrl('/add-questions');
  }
}
