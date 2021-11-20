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
  parentQuestionArrayIndex = 0;
  categoryList: { id: number; itemName: string; name: string }[] = [
    { id: 1, itemName: 'Catogory A', name: 'A' },
    { id: 2, itemName: 'Catogory B', name: 'B' },
    { id: 3, itemName: 'Catogory C', name: 'C' },
    { id: 4, itemName: 'Catogory D', name: 'D' },
  ];
  selectedCategories: { id: number; itemName: string; name: string }[] = [];
  settingsCategories = {
    enableSearchFilter: false,
    addNewItemOnFilter: false,
    singleSelection: true,
    text: 'Select Category',
  };
  languageList = [
    { id: 1, itemName: 'English', name: 'en' },
    { id: 2, itemName: 'Tamil', name: 'tn' },
    // { id: 3, itemName: 'Kannada', name: 'ka' },
    // { id: 4, itemName: 'Hindi', name: 'hi' },
    // { id: 3, itemName: 'Telugu', name: 'tl' },
    // { id: 5, itemName: 'Malayalam', name: 'ma' },
  ];
  questionsForm = this.fb.group({
    category: new FormControl('', [Validators.required]),
    questionsArray: this.fb.array([]),
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
  parentQuestionsArray(): FormArray {
    return this.questionsForm.get('questionsArray') as FormArray;
  }
  questions(): FormArray {
    return this.fb.array([]);
  }
  childQuestionsArray(parentQuestionsArrayIndex: number): FormArray {
    return this.parentQuestionsArray().at(
      parentQuestionsArrayIndex
    ) as FormArray;
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
      primaryQuestionId: new FormControl(null),
      quizType: new FormControl(this.quizType),
      options: this.fb.array([]),
    });
  }

  getQuestions(
    parentQuestionsArrayIndex: number,
    childQuestionsArrayIndex: number
  ): FormGroup {
    return this.childQuestionsArray(parentQuestionsArrayIndex).at(
      childQuestionsArrayIndex
    ) as FormGroup;
  }

  optionsArray(
    parentQuestionsArrayIndex: number,
    childQuestionsArrayIndex: number
  ): FormArray {
    return this.getQuestions(
      parentQuestionsArrayIndex,
      childQuestionsArrayIndex
    ).get('options') as FormArray;
  }

  getOption(
    parentQuestionsArrayIndex: number,
    childQuestionsArrayIndex: number,
    optionIndex: number
  ): FormGroup {
    const optionsArray: FormArray = this.optionsArray(
      parentQuestionsArrayIndex,
      childQuestionsArrayIndex
    );
    return optionsArray.at(optionIndex) as FormGroup;
  }

  optionGroup(): FormGroup {
    return this.fb.group({
      optionId: new FormControl(null),
      options: new FormControl('', [Validators.required]),
      optionImage: new FormControl(''),
      questionId: new FormControl(''),
      isActive: new FormControl('true'),
      isAnswer: new FormControl('false'),
    });
  }
  addChildQuestionsArray() {
    this.parentQuestionsArray().push(this.questions());
  }

  addOptions(
    parentQuestionsArrayIndex: number,
    childQuestionsArrayIndex: number
  ) {
    this.optionsArray(parentQuestionsArrayIndex, childQuestionsArrayIndex).push(
      this.optionGroup()
    );
  }
  getQuestionsGroup(
    parentQuestionArrayIndex: number,
    questionGroupIndex: number
  ) {
    this.childQuestionsArray(parentQuestionArrayIndex).at(questionGroupIndex);
  }
  generateQuestions() {
    this.addChildQuestionsArray();
    for (let question = 0; question < this.languageList.length; question++) {
      this.childQuestionsArray(this.parentQuestionArrayIndex).push(
        this.questionGroup(question)
      );
      for (let option = 0; option < 4; option++) {
        this.addOptions(this.parentQuestionArrayIndex, question);
      }
    }
    this.parentQuestionArrayIndex++;
  }
  isCategoryValid(): boolean {
    if (this.questionsForm.controls.category.invalid) {
      this.questionsForm.markAllAsTouched();
      this.toastrService.error(
        'Please fill all mandatory fields',
        'Form Validation Error!!!'
      );
      console.log(this.questionsForm.errors);
      return false;
    } else {
      return true;
    }
  }
  isValidForm(): boolean {
    if (this.questionsForm.invalid) {
      this.questionsForm.markAllAsTouched();
      this.toastrService.error(
        'Please fill all mandatory fields',
        'Form Validation Error!!!'
      );
      console.log(this.questionsForm.errors);
      return false;
    } else {
      return true;
    }
  }
  submitForm(): boolean | void {
    if (!this.isCategoryValid()) {
      return false;
    }
    const responseJson: Questions = this.questionsForm.value;
    var parentArray: FormArray = this.questionsForm.controls
      .questionsArray as FormArray;
    var parentArrayLength = parentArray.length;
    for (let parentIndex = 0; parentIndex < parentArrayLength; parentIndex++) {
      var childArray = parentArray.at(parentIndex) as FormArray;
      var childArrayLength = childArray.length;
      for (let childIndex = 0; childIndex < childArrayLength; childIndex++) {
        const questionGroup = childArray.at(childIndex);
        const optionsArray = questionGroup.get('options') as FormArray;
        console.log('categoryName: ', this.selectedCategories[0]?.name);
        const patchCategory = { category: this.selectedCategories[0]?.name };
        questionGroup.patchValue(patchCategory);
        var answer = questionGroup.get('answer')?.value;
        for (
          let optionIndex = 0;
          optionIndex < optionsArray.length;
          optionIndex++
        ) {
          const optionGroup = optionsArray.at(optionIndex) as FormGroup;
          var patchAnswer = { isAnswer: 'false' };
          if ((optionGroup.get('options') as FormGroup).value === answer) {
            patchAnswer.isAnswer = 'true';
          }
          optionGroup.patchValue(patchAnswer);
        }
      }
    }
    console.log(responseJson.questionsArray);
    if (!this.isValidForm()) {
      return false;
    }
    responseJson.questionsArray.forEach((questionArray: Question[]) => {
      this.questionService.uploadQuestions(questionArray).subscribe(
        (res) => {
          this.toastrService.success('Questions Added Successfully', 'Success');
        },
        (err) => {
          console.log(err);
          this.toastrService.error(err.error, 'Error!!!');
        }
      );
    });
  }
  resetForm() {
    this.questionsForm.reset();
  }
  onItemSelect(item: any) {
    this.selectedCategories.length = 0;
    this.selectedCategories.push(item);
    console.log(this.selectedCategories);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    this.selectedCategories.length = 0;
    console.log(this.selectedCategories);
  }
}
