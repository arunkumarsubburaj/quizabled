import { QuestionSet } from './models/quiz';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Question } from './models/questions';
export interface QuizConfig {
  category: string;
  language: string;
  quizType: number;
}
@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private questionType$: BehaviorSubject<string> = new BehaviorSubject('demo');
  private language$: BehaviorSubject<string> = new BehaviorSubject('en');
  private category$: BehaviorSubject<string> = new BehaviorSubject('A');
  private isDemoSession$ = new BehaviorSubject<boolean>(false);
  constructor(private HttpClient: HttpClient) {}
  getQuestionType() {
    return this.questionType$.asObservable();
  }
  setQuestionType(type: string) {
    this.questionType$.next(type);
  }
  getLanguage() {
    return this.language$.asObservable();
  }
  setLanguage(language: string) {
    this.language$.next(language);
  }
  getCategory() {
    return this.category$.asObservable();
  }
  setCategory(language: string) {
    this.category$.next(language);
  }
  getDemoSession() {
    return this.isDemoSession$.asObservable();
  }
  setDemoSession(isDemoSession: boolean) {
    this.isDemoSession$.next(isDemoSession);
  }
  uploadQuestions(questions: Question[]) {
    return this.HttpClient.post(
      `${environment.apiUrl}/addQuestions`,
      questions
    );
  }
  getQuestions(questionObj: QuizConfig) {
    return this.HttpClient.post(
      `${environment.apiUrl}/getQuestions`,
      questionObj
    );
  }
}
