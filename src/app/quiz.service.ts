import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Question } from './models/questions';
import { map, take } from 'rxjs/operators';
import { QmQuestionList } from './qm-question-list/qm-question-list';
import { AnswerObj } from './student-details/student.model';
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
    return this.http.post(
      `${environment.apiUrl}/getAnswers`,
      questionObj
    ) as Observable<AnswerObj[]>;
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
  getQuestionList(queryParams: {
    category: string;
    quizType: number;
    isActive: number;
  }): Observable<QmQuestionList> {
    return this.http.get(
      `${environment.apiUrl}/getAllQuestions?category=${queryParams.category}&quizType=${queryParams.quizType}&isActive=${queryParams.isActive}`
    ) as Observable<QmQuestionList>;
  }
  deleteQuestion(questionId: number) {
    return this.http.delete(
      `${environment.apiUrl}/deleteQuestion?questionId=${questionId}`
    );
  }
  getQuestion(questionId: number) {
    return this.http.get(
      `${environment.apiUrl}/getQuestion?questionId=${questionId}`
    );
  }
  updateQuestion(questions: Question[]) {
    return this.http.put(`${environment.apiUrl}/editQuestion`, questions);
  }
}
