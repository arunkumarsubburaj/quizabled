import { LogObj } from './../student-details/student.model';
import { Question } from './../models/questions';
import { QuestionSet, Option, SecondaryQuestionsObj } from './../models/quiz';
import { QuizConfig, QuizService } from './../quiz.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserInfo, UserService } from '../user.service';
import {
  CountdownComponent,
  CountdownConfig,
  CountdownEvent,
} from 'ngx-countdown';
import { environment } from 'src/environments/environment';
import { AdminService } from '../admin.service';
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
  isReviewHide: boolean = true;
  resultArrayObj: LogObj[] = [];
  questionAnswered = 0;
  countDownConfig: CountdownConfig = { leftTime: 1800, demand: true };
  counterStatus: any;
  quizTitle: string = '';
  userData!: UserInfo;
  @ViewChild('cd') private cd!: CountdownComponent;
  constructor(
    private quizService: QuizService,
    private router: Router,
    private toastrService: ToastrService,
    private userService: UserService,
    private adminService: AdminService
  ) {
    this.quizService
      .getQuizConfig()
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
    this.userService.getUser().subscribe((userData: UserInfo | {}) => {
      if (userData == {}) {
        this.router.navigateByUrl('/home');
      } else {
        this.userData = userData as UserInfo;
        if (
          (userData as UserInfo).role == 'STUDENT' ||
          (userData as UserInfo).role == 'STUDENT_TEST'
        ) {
          this.quizTitle = 'Quizabled: Main Test';
        } else {
          this.quizTitle = 'Quizabled: Mock Test';
        }
      }
    });
  }
  ngOnInit() {
    this.quizService
      .getQuestions(this.quizConfig as QuizConfig)
      .pipe(
        map((res) => {
          const primaryQuestionsObj = (res as QuestionSet).primaryQuestionsObj;
          const secondaryQuestionsObj = (res as QuestionSet)
            .secondaryQuestionsObj;
          primaryQuestionsObj.questions.sort((a, b) => {
            return a.questionId - b.questionId;
          });
          if (secondaryQuestionsObj) {
            secondaryQuestionsObj.questions.sort((a, b) => {
              return a.primaryQuestionId - b.primaryQuestionId;
            });
          }
          return res;
        })
      )
      .subscribe(
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
          setTimeout(() => {
            this.cd.begin();
            this.counterStatus = 'on';
            this.adminService
              .updateQuizStatus(this.userData.id, {
                isAttended: 1,
                timeStamp: Date.now(),
              })
              .subscribe(
                (res) => {
                  console.log('status updated...');
                },
                (err) => {
                  console.log('Error: ', err);
                }
              );
          }, 500);
        },
        (err) => {
          if (err.status == 404) {
            this.toastrService.error('No Questions to display!!!', 'Error');
          } else {
            this.toastrService.error(err.status, 'Error');
          }
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
    this.resultArrayObj.length = 0;
    this.questionAnswered = 0;
    var questions = document.querySelectorAll('.quizWrap.questionBox');
    for (let index = 0; index < questions.length; index++) {
      const question = questions[index];
      var selectedOption = question.querySelector(
        'input.questionNOption:checked'
      );
      this.questionAnswered =
        selectedOption != null
          ? this.questionAnswered + 1
          : this.questionAnswered;
      var questionId = question.querySelector(
        "input[name='questionId']"
      ) as HTMLInputElement;
      var questionEle = question.querySelector(
        "input[name='question']"
      ) as HTMLInputElement;
      var questionNoEle = question.querySelector(
        "input[name='questionNo']"
      ) as HTMLInputElement;
      this.resultArrayObj.push({
        questionId: questionId.value,
        question: questionEle.value,
        selectedOptionId: +(selectedOption?.id as string),
        selectedValue: selectedOption
          ? selectedOption.getAttribute('data-selectedValue')
          : null,
        questionNo: questionNoEle.value,
      });
    }
    window.sessionStorage.setItem(
      'resultArrayObj',
      JSON.stringify(this.resultArrayObj)
    );
    if (this.counterStatus == 'on') {
      this.isReviewHide = false;
    } else {
      this.gotoCertify();
    }
  }
  gotoQuestion(questionObj: any) {
    this.currentIndex = questionObj.questionNo - 1;
    this.isReviewHide = true;
  }
  gotoCertify() {
    if (this.counterStatus == 'on') {
      this.counterStatus = 'off';
      this.cd.stop();
    }
    if (this.userData && this.userData.id) {
      const quizStatus = this.adminService.updateQuizStatus(this.userData.id, {
        isAttended: 2,
        timeStamp: Date.now(),
      });
      const log = this.adminService.addQuizLog(this.userData.id.toString(), {
        answerObj: this.resultArrayObj,
      });
      forkJoin([quizStatus, log]).subscribe(
        (res) => {
          console.log('status updated...');
          console.log('status updated...');
          setTimeout(() => {
            this.router.navigateByUrl('/result');
          }, 500);
        },
        (err) => {
          this.toastrService.error(err);
        }
      );
    } else {
      this.router.navigateByUrl('/result');
    }
  }
  handleCounterEvent(event: CountdownEvent) {
    if (event.action == 'stop') {
      this.counterStatus = 'off';
      const timeConsumed = 1800000 - event.left;
      const timeTaken = this.millisToMinutesAndSeconds(timeConsumed);
      window.sessionStorage.setItem('timeTaken', timeTaken);
      if (event.left == 0) {
        this.gotoReview();
      }
    }
  }
  millisToMinutesAndSeconds(millis: number) {
    var minutes = Math.floor(millis / 60000);
    var seconds: number = +((millis % 60000) / 1000).toFixed(0);
    return `${minutes} mins ${seconds < 10 ? '0' : ''}${seconds} secs `;
  }
  getImage(imageObj: any, isOption?: boolean) {
    console.log(`${environment.imagePath}/${imageObj.questionImage}`);
    return `${environment.imagePath}/${
      isOption ? imageObj.optionImage : imageObj.questionImage
    }`;
  }
  expand(imageObj: any, isOption?: boolean) {
    const zoomedImg = document.querySelector('.zoomedImg');
    const imaggePath = `${environment.imagePath}/${
      isOption ? imageObj.optionImage : imageObj.questionImage
    }`;
    zoomedImg?.querySelector('img')?.setAttribute('src', imaggePath);
    zoomedImg?.classList.add('show');
  }
  collapseImage() {
    document.querySelector('.zoomedImg')?.classList.remove('show');
  }
}
