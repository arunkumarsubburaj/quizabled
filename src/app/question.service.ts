import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Question } from './models/questions';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private questionType$: BehaviorSubject<string> = new BehaviorSubject('demo');
  constructor(private HttpClient: HttpClient) {}
  getQuestionType() {
    return this.questionType$.asObservable();
  }
  setQuestionType(type: string) {
    this.questionType$.next(type);
  }
  uploadQuestions(questions: Question[]) {
    return this.HttpClient.post(
      `${environment.apiUrl}/addQuestions`,
      questions
    );
  }
}
