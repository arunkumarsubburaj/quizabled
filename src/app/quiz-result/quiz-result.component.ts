import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { QuizService } from '../quiz.service';
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
  user: any;
  answerArryObj: any;
  quizConfig: any;
  timeTaken: any;
  constructor(private quizService: QuizService) {
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
    this.user = window.sessionStorage.getItem('userData')
      ? JSON.parse(window.sessionStorage.getItem('userData') as string)
      : null;
    if (this.user && this.user.role != 'DEMO') {
      this.participantName = this.user.name;
      this.participantInstitution = this.user.institution;
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
  }
}
