import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-category',
  templateUrl: './quiz-category.component.html',
  styleUrls: ['./quiz-category.component.scss'],
})
export class QuizCategoryComponent implements OnInit {
  constructor(private router: Router) {}
  languageList: any = [];
  languageConfig = {};
  selectedLanguages: any = [];
  ngOnInit() {
    this.languageList = [
      { id: 1, itemName: 'English', name: 'en' },
      { id: 2, itemName: 'Tamil', name: 'tn' },
      // { id: 3, itemName: 'Kannada', name: 'ka' },
      // { id: 4, itemName: 'Hindi', name: 'hi' },
      // { id: 3, itemName: 'Telugu', name: 'tl' },
      // { id: 5, itemName: 'Malayalam', name: 'ma' },
    ];
    this.languageConfig = {
      singleSelection: true,
      text: 'Select Language',
      position: 'bottom',
      autoPosition: false,
    };
    this.selectedLanguages = [];
  }
  updateCategory(category: string) {
    window.sessionStorage.setItem('selectedCategory', category);
    this.router.navigateByUrl('/quiz');
  }
}
