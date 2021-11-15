import { ToastrService } from 'ngx-toastr';
import { QuestionService } from './../question.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Option, Question, Questions } from '../models/questions';
export enum QuizType {
  'demo' = 1,
  'main' = 2,
}
@Component({
  selector: 'app-qm-questions',
  templateUrl: './qm-questions.component.html',
  styleUrls: ['./qm-questions.component.scss'],
})
export class QmQuestionsComponent implements OnInit, AfterViewInit {
  constructor(
    private questionService: QuestionService,
    public fb: FormBuilder,
    private toastrService: ToastrService
  ) {}
  headerTitle: string = '';
  quizType: number = QuizType.demo;
  categotyList = [
    { id: 1, itemName: 'Catogory A', name: 'A' },
    { id: 2, itemName: 'Catogory B', name: 'B' },
    { id: 3, itemName: 'Catogory C', name: 'C' },
    { id: 4, itemName: 'Catogory D', name: 'D' },
  ];
  selectedCategories = [];
  settingsCategories = {
    enableSearchFilter: false,
    addNewItemOnFilter: false,
    singleSelection: true,
    text: 'Select Category',
  };
  languageList = [
    { id: 1, itemName: 'English', name: 'en' },
    { id: 2, itemName: 'Tamil', name: 'tn' },
    // { id: 3, itemName: 'Telugu', name: 'tl' },
    { id: 3, itemName: 'Kannada', name: 'ka' },
    // { id: 5, itemName: 'Malayalam', name: 'ma' },
    { id: 4, itemName: 'Hindi', name: 'hi' },
  ];
  questionsForm = this.fb.group({
    category: new FormControl('', [Validators.required]),
    language: new FormControl('', [Validators.required]),
    questions: this.fb.array([]),
  });
  ngOnInit() {}
  ngAfterViewInit() {
    this.questionService.getQuestionType().subscribe((res: any) => {
      switch (res) {
        case 'demo':
          this.quizType = QuizType.demo;
          this.headerTitle = 'Add / Update Demo Quiz Questions';
          break;
        case 'main':
          this.quizType = QuizType.main;
          this.headerTitle = 'Add / Update Main Quiz Questions';
          break;
        default:
          break;
      }
    });
    this.generateQuestions();
  }
  questions(): FormArray {
    return this.questionsForm.get('questions') as FormArray;
  }

  questionGroup(langIndex: number): FormGroup {
    const langCode = this.languageList[langIndex].name;
    return this.fb.group({
      questionId: new FormControl(null),
      question: new FormControl('', [Validators.required]),
      questionImage: new FormControl(null),
      languageCode: new FormControl(langCode, [Validators.required]),
      category: new FormControl('', [Validators.required]),
      optionId: new FormControl(null),
      isActive: new FormControl('true'),
      answer: new FormControl(''),
      primaryLangCode: new FormControl(null),
      quizType: new FormControl(this.quizType),
      options: this.fb.array([]),
    });
  }

  optionsArray(qIndex: number): FormArray {
    return this.questions().at(qIndex).get('options') as FormArray;
  }

  optionGroup(): FormGroup {
    return this.fb.group({
      optionId: new FormControl(null),
      options: new FormControl('', [Validators.required]),
      optionImage: new FormControl(''),
      questionId: new FormControl(''),
      isActive: new FormControl(true),
      isAnswer: new FormControl(false),
    });
  }

  addOptions(qIndex: number) {
    this.optionsArray(qIndex).push(this.optionGroup());
  }

  addQuestions(languageIndex: number) {
    this.questions().push(this.questionGroup(languageIndex));
  }

  private generateQuestions() {
    for (let question = 0; question < this.languageList.length; question++) {
      this.addQuestions(question);
      for (let option = 0; option < 4; option++) {
        this.addOptions(question);
      }
    }
  }
  submitForm() {
    console.log(this.questionsForm.value);
    const responseJson: Questions = this.questionsForm.value;
    responseJson.questions.forEach((question: Question) => {
      question.category = responseJson.category[0]?.name;
      question.options.forEach((option: Option) => {
        option.isAnswer = (question.answer === option.options).toString();
        option.isActive = 'true';
        option.questionId = question.questionId ? question?.questionId : null;
      });
    });
    let finalObject = responseJson.questions.filter(
      (questionGrp) => questionGrp.question !== ''
    );
    console.log(finalObject);
    this.questionService.uploadQuestions(finalObject).subscribe(
      (res) => {
        this.toastrService.success('Questions Added Successfully', 'Success');
      },
      (err) => {
        console.log(err);
        this.toastrService.error(err, 'Error!!!');
      }
    );
  }
  resetForm() {
    this.questionsForm.reset();
  }
}
