import { ToastrService } from 'ngx-toastr';
import { QuizService } from '../quiz.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Option, Question, Questions } from '../models/questions';
import { Router } from '@angular/router';
import { ImageUploadResponse } from '../models/quiz';
import { environment } from 'src/environments/environment';
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
    private quizService: QuizService,
    public fb: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
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
  // answerList: { id: number; itemName: string; name: string }[] = [];
  // selectedAnswers: { id: number; itemName: string; name: string }[] = [];
  answerCategories = {
    enableSearchFilter: false,
    addNewItemOnFilter: false,
    singleSelection: true,
    text: 'Select Answer',
  };
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
    this.quizService.getQuestionType().subscribe((res: any) => {
      switch (res) {
        case 'demo':
          this.quizType = QuizType.demo;
          this.headerTitle = 'Add Demo Quiz Questions';
          break;
        case 'main':
          this.quizType = QuizType.main;
          this.headerTitle = 'Add Main Quiz Questions';
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
      question: new FormControl(''),
      questionImage: new FormControl(''),
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
      options: new FormControl(''),
      optionImage: new FormControl(''),
      questionId: new FormControl(null),
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
  updateAnswer(event: any, pIndex: number, qIndex: number) {
    const options: FormArray = this.optionsArray(pIndex, qIndex) as FormArray;
    const question: FormGroup = this.getQuestions(pIndex, qIndex);
    for (let oIndex = 0; oIndex < options.length; oIndex++) {
      const option: FormGroup = options.at(oIndex) as FormGroup;
      option.get('isAnswer')?.setValue('false');
      if (oIndex == event.currentTarget.value) {
        option.get('isAnswer')?.setValue('true');
        const optionValue = option.get('options')?.value;
        question.get('answer')?.setValue(optionValue);
      }
    }
  }
  validateQuestionNOptions(): boolean {
    const questionFormObj = this.questionsForm.value;
    const questionsArray = questionFormObj.questionsArray[0];
    let isValid = true;
    for (let qIndex = 0; qIndex < questionsArray.length; qIndex++) {
      const questionObj: Question = questionsArray[qIndex];
      if (!questionObj.questionImage && !questionObj.question) {
        this.toastrService.error(
          'Either question or question Image should not be empty',
          'Form Validation Error!!!'
        );
        isValid = false;
        return false;
      }
      const optionArray = questionObj.options;
      for (let oIndex = 0; oIndex < optionArray.length; oIndex++) {
        const optionObj: Option = optionArray[oIndex];
        if (!optionObj.optionImage && !optionObj.options) {
          this.toastrService.error(
            'Either option or option Image should not be empty',
            'Form Validation Error!!!'
          );
          isValid = false;
          return false;
        }
      }
    }
    console.log(isValid);
    return isValid;
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
    this.updateFormValues();
    if (!this.validateQuestionNOptions()) {
      return false;
    }
    console.log(responseJson.questionsArray);
    if (!this.isValidForm()) {
      return false;
    }
    responseJson.questionsArray.forEach((questionArray: Question[]) => {
      this.quizService.uploadQuestions(questionArray).subscribe(
        (res) => {
          this.toastrService.success('Questions Added Successfully', 'Success');
          this.questionsForm.controls.questionsArray.reset();
          this.resetImage();
          this.resetRadioButtons();
          this.setDefaults();
        },
        (err) => {
          console.log(err);
          this.toastrService.error(err.error, 'Error!!!');
        }
      );
    });
  }
  updateFormValues() {
    var parentArray: FormArray = this.questionsForm.controls
      .questionsArray as FormArray;
    var parentArrayLength = parentArray.length;
    for (let parentIndex = 0; parentIndex < parentArrayLength; parentIndex++) {
      var childArray = parentArray.at(parentIndex) as FormArray;
      var childArrayLength = childArray.length;
      for (let childIndex = 0; childIndex < childArrayLength; childIndex++) {
        const langCode = this.languageList[childIndex].name;
        const questionGroup = childArray.at(childIndex);
        console.log('categoryName: ', this.selectedCategories[0]?.name);
        const patchValues = {
          category: this.selectedCategories[0]?.name,
          isActive: 'true',
          languageCode: langCode,
          quizType: this.quizType,
        };
        questionGroup.patchValue(patchValues);
      }
    }
  }
  resetForm() {
    this.questionsForm.controls.questionsArray.reset();
    this.resetImage();
    this.resetRadioButtons();
    this.router.navigateByUrl('/quiz-master');
  }
  resetRadioButtons() {
    const checkedItems = document.querySelectorAll(
      '.ansOptions input[type="radio"]:checked'
    );
    checkedItems.forEach((radioElement: any) => {
      radioElement.checked = false;
    });
  }
  onItemSelect(item: any, pqIndex: number, qIndex: number) {
    console.log(item);
    this.getQuestions(pqIndex, qIndex).get('answer')?.setValue(item.name);
  }
  OnItemDeSelect(item: any, pqIndex: number, qIndex: number) {
    console.log(item);
    this.getQuestions(pqIndex, qIndex).get('answer')?.setValue('');
  }
  uploadImage(event: any, imageType: string, optionIndex?: number) {
    const file = event.currentTarget.files[0];
    if (!file.type.startsWith('image/')) {
      return;
    }
    this.quizService.uploadImage(file).subscribe((res) => {
      if (imageType == 'qn') {
        const questionElements = Array.from(
          document.querySelectorAll('.questionImage')
        );
        questionElements.forEach((questionElement: any, i: number) => {
          questionElement.style.backgroundImage = `url('${
            environment.imagePath + '/' + (res as ImageUploadResponse).filename
          }')`;
          this.getQuestions(0, i).controls['questionImage'].setValue(
            (res as ImageUploadResponse).filename
          );
        });
      } else {
        const queArray = Array.from(document.querySelectorAll('.ansOptions'));
        queArray.forEach((queEle, qIndex) => {
          const optionArrayEle = queEle.querySelectorAll('.imgUpload');
          (
            optionArrayEle[optionIndex as number] as HTMLElement
          ).style.backgroundImage = `url('${
            environment.imagePath + '/' + (res as ImageUploadResponse).filename
          }')`;
          this.getOption(0, qIndex, optionIndex as number).controls[
            'optionImage'
          ].setValue((res as ImageUploadResponse).filename);
        });
      }
    });
  }
  setDefaults() {
    const questionsArray = (
      this.questionsForm.controls.questionsArray as FormArray
    ).at(0) as FormArray;
    for (let qIndex = 0; qIndex < questionsArray.length; qIndex++) {
      const questionObj = questionsArray.at(qIndex) as FormGroup;
      const langCode = this.languageList[qIndex].name;
      const patchValue: Partial<Question> = {
        answer: '',
        category: this.selectedCategories[0]?.name,
        isActive: 'true',
        languageCode: langCode,
        optionId: null,
        primaryQuestionId: null,
        question: '',
        questionId: null,
        questionImage: '',
        quizType: this.quizType,
      };
      questionObj.patchValue(patchValue);
      const optionsArray = questionObj.controls.options as FormArray;
      for (let oIndex = 0; oIndex < optionsArray.length; oIndex++) {
        const optionObj = optionsArray.at(oIndex) as FormGroup;
        const optionPatchValue: Partial<Option> = {
          isActive: 'true',
          isAnswer: 'false',
          optionId: null,
          optionImage: '',
          options: '',
          questionId: null,
        };
        optionObj.patchValue(optionPatchValue);
      }
    }
  }
  resetImage() {
    const imageArray = document.querySelectorAll('.imgUpload');
    for (let index = 0; index < imageArray.length; index++) {
      const image: any = imageArray[index];
      image.style.backgroundImage = '';
    }
  }
}
