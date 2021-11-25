import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Question } from './models/questions';
import { map, take } from 'rxjs/operators';
import { QmQuestionList } from './qm-question-list/qm-question-list';
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
  constructor(private http: HttpClient) {}
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
    return this.http.post(`${environment.apiUrl}/addQuestions`, questions);
  }
  getQuestions(questionObj: QuizConfig) {
    return this.http.post(`${environment.apiUrl}/getQuestions`, questionObj);
  }
  getAnswers(questionObj: QuizConfig) {
    return this.http.post(`${environment.apiUrl}/getAnswers`, questionObj);
  }
  getQuizConfig() {
    return forkJoin({
      category: this.getCategory().pipe(take(1)),
      quizType: this.getDemoSession().pipe(take(1)),
      language: this.getLanguage().pipe(take(1)),
    });
  }
  uploadImage(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload, fileToUpload.name);
    return this.http.post(`${environment.apiUrl}/upload`, formData);
  }
  getQuestionList(): Observable<QmQuestionList> {
    return this.http.get(
      `${environment.apiUrl}/getAllQuestions`
    ) as Observable<QmQuestionList>;
  }
}
