import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { QuizService } from '../quiz.service';
import { UserInfo } from '../user.service';
@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss'],
})
export class QuizResultComponent implements OnInit {
  currentDate = new Date();
  participantName = 'MOCK PARTICIPANT';
  participantInstitution = 'Example School';
  questionsAnswered = 0;
  resultArrayObj: any;
  totalQuestions!: number;
  user!: UserInfo;
  answerArryObj: any;
  quizConfig: any;
  isDemoUser: boolean = false;
  timeTaken: any;
  constructor(
    private quizService: QuizService,
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
  }
  ngOnInit() {
    this.isDemoUser = sessionStorage.getItem('isDemoUser') == 'true';
    if (!this.isDemoUser) {
      this.user = window.sessionStorage.getItem('userData')
        ? JSON.parse(window.sessionStorage.getItem('userData') as string)
        : null;
      if (this.user && (this.user as UserInfo).role != 'DEMO') {
        this.participantName = (this.user as UserInfo).name;
        this.participantInstitution = (this.user as UserInfo).institution;
      }
    }
    this.resultArrayObj = window.sessionStorage.getItem('resultArrayObj')
      ? JSON.parse(window.sessionStorage.getItem('resultArrayObj') as string)
      : null;
    this.quizService.getAnswers(this.quizConfig).subscribe((res) => {
      this.answerArryObj = res;
      this.validateMarks();
    });
    this.timeTaken = window.sessionStorage.getItem('timeTaken');
    this.totalQuestions = this.resultArrayObj.length;
  }
  printCertificate() {
    window.print();
  }
  validateMarks() {
    this.resultArrayObj.forEach((resultObj: any) => {
      const answerObj = this.answerArryObj.filter((answerObj: any) => {
        return answerObj.questionId == resultObj.questionId;
      })[0];
      if (resultObj.selectedOptionId == answerObj.optionId) {
        this.questionsAnswered += 1;
      }
    });
    this.adminService
      .updateMarks({
        studentId: (this.user as UserInfo).id,
        totalMark: this.questionsAnswered,
      })
      .subscribe(
        (res) => {
          console.log('Marks Updated in DB');
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
