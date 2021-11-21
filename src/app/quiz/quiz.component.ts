import { QuestionSet, Option } from './../models/quiz';
import { QuizConfig, QuizService } from './../quiz.service';
import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  category: string = 'A';
  quizType: string = 'demo';
  language: string = 'en';
  primaryQuestionsArray: any = [];
  secondaryQuestionsArray: any = [];
  quizConfig: QuizConfig | {} = {};
  currentIndex: number = 0;
  constructor(
    private quizService: QuizService,
    private router: Router,
    private toastrService: ToastrService,
    private userService: UserService
  ) {
    forkJoin({
      category: this.quizService.getCategory().pipe(take(1)),
      quizType: this.quizService.getDemoSession().pipe(take(1)),
      language: this.quizService.getLanguage().pipe(take(1)),
    })
      .pipe(catchError((error) => of(error)))
      .subscribe((res) => {
        console.log(res);
        this.quizConfig = {
          category: res.category,
          language: res.language,
          quizType: res.quizType ? 1 : 2,
        };
      });
    this.userService.getLoginStatus().subscribe((status) => {
      if (!status) {
        this.router.navigateByUrl('/home');
      }
    });
  }
  ngOnInit() {
    this.quizService.getQuestions(this.quizConfig as QuizConfig).subscribe(
      (res): void => {
        const primaryQuestionsObj = (res as QuestionSet).primaryQuestionsObj;
        const secondaryQuestionsObj = (res as QuestionSet)
          .secondaryQuestionsObj;
        primaryQuestionsObj.questions.forEach((question) => {
          this.primaryQuestionsArray.push({
            questionObj: question,
            optionsArray: this.getOptions(
              question.questionId,
              primaryQuestionsObj.options
            ),
          });
        });
        if (secondaryQuestionsObj && secondaryQuestionsObj.questions) {
          secondaryQuestionsObj.questions.forEach((question) => {
            this.secondaryQuestionsArray.push({
              questionObj: question,
              optionsArray: this.getOptions(
                question.questionId,
                secondaryQuestionsObj.options
              ),
            });
          });
        }
      },
      (err) => {
        this.toastrService.error(err.error, 'Error');
      }
    );
    console.log(this.primaryQuestionsArray, this.secondaryQuestionsArray);
  }
  getOptions(questionId: number, optionArray: any) {
    return optionArray.filter(
      (option: Option) => option.questionId == questionId
    );
  }
  changeQuestion(direction: string) {
    if (direction == 'prev') {
      this.currentIndex--;
    } else {
      this.currentIndex++;
    }
  }
  gotoReview() {
    this.router.navigateByUrl('/review');
  }
}
