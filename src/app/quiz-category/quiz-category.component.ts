import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz-category',
  templateUrl: './quiz-category.component.html',
  styleUrls: ['./quiz-category.component.scss'],
})
export class QuizCategoryComponent implements OnInit {
  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private quizService: QuizService,
    private userService: UserService
  ) {
    this.userService.getUser().subscribe((res) => {
      this.user = res;
    });
  }
  user: any;
  languageList: any = [];
  languageConfig = {};
  selectedLanguages: any = [];
  ngOnInit() {
    this.userService.getLoginStatus().subscribe((status) => {
      if (!status) {
        this.router.navigateByUrl('/home');
      }
    });
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
    this.quizService.setCategory(category);
  }
  onItemSelect(eve: any) {
    console.log(eve);
    window.sessionStorage.setItem(
      'selectedLanguage',
      this.selectedLanguages[0].name
    );
    this.quizService.setLanguage(this.selectedLanguages[0].name);
  }
  goToQuiz(): boolean | void {
    if (
      window.sessionStorage.getItem('selectedLanguage') == undefined ||
      (window.sessionStorage.getItem('selectedLanguage') as string)?.length == 0
    ) {
      this.toastrService.error('Please select a Language', 'Error');
      return false;
    }
    if (this.user && this.user.q_category) {
      window.sessionStorage.setItem('selectedCategory', this.user.q_category);
      this.quizService.setCategory(this.user.q_category);
    }
    if (
      window.sessionStorage.getItem('selectedCategory') == undefined ||
      (window.sessionStorage.getItem('selectedCategory') as string)?.length == 0
    ) {
      this.toastrService.error('Please select a category', 'Error');
      return false;
    }
    this.router.navigateByUrl('/quiz');
  }
}
