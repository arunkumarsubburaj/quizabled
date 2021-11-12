import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private questionType$: BehaviorSubject<string> = new BehaviorSubject('demo');
  constructor() {}
  getQuestionType() {
    return this.questionType$.asObservable();
  }
  setQuestionType(type: string) {
    this.questionType$.next(type);
  }
}
