import { Component, OnInit } from '@angular/core';
// declare let html2pdf: any;
@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss'],
})
export class QuizResultComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  printCertificate() {
    var element = document.getElementById('printCertificate');
    var opt = {
      margin: 1,
      filename: 'quizabled.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    // html2pdf(element, opt);
  }
}
