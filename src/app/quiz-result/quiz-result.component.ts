import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss'],
})
export class QuizResultComponent implements OnInit {
  constructor() {}
  currentDate = new Date();
  participantName = 'MOCK PARTICIPANT';
  participantInstitution = 'Example School';
  questionsAnswered = 16;
  totalQuestions = 20;
  ngOnInit() {}
  printCertificate() {
    window.print();
  }
}
