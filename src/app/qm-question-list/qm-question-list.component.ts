import { QuizService } from './../quiz.service';
import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { QmQuestionList } from './qm-question-list';

@Component({
  selector: 'app-qm-question-list',
  templateUrl: './qm-question-list.component.html',
  styleUrls: ['./qm-question-list.component.css'],
})
export class QmQuestionListComponent implements OnInit {
  constructor(private quizService: QuizService) {}
  columnDefs: ColDef[] = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
  ];
  ngOnInit() {
    this.quizService.getQuestionList().subscribe((res: QmQuestionList) => {
      console.log(res);
      res.questionArray.forEach((question) => {});
    });
  }
}
