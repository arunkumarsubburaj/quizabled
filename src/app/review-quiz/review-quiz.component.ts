import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-quiz',
  templateUrl: './review-quiz.component.html',
  styleUrls: ['./review-quiz.component.scss'],
})
export class ReviewQuizComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  gotoCertify() {
    this.router.navigateByUrl('/result');
  }
}
