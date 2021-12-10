import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from './../quiz.service';
import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi } from 'ag-grid-community';
import { QmQuestionList, QuestionArray, OptionArray } from './qm-question-list';
import { EditDeleteRenderer } from './edit-delete-button.component';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
export interface QuestionRowData {
  sno: number;
  question: string;
  questionImage: string;
  option1: string;
  option1Image: string;

  option2: string;
  option2Image: string;

  option3: string;
  option3Image: string;

  option4: string;
  option4Image: string;

  action: string;
}
@Component({
  selector: 'app-qm-question-list',
  templateUrl: './qm-question-list.component.html',
  styleUrls: ['./qm-question-list.component.scss'],
})
export class QmQuestionListComponent implements OnInit {
  constructor(
    private quizService: QuizService,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  columnDefs: ColDef[] = [
    { field: 'sno', width: 130, headerName: 'S.No', resizable: false },
    { field: 'question' },
    { field: 'questionImage', headerName: 'Question Image' },
    { field: 'isActive', headerName: 'Is Active' },
    { field: 'option1' },
    { field: 'option1Image', headerName: 'Option1 Image' },
    { field: 'option2' },
    { field: 'option2Image', headerName: 'Option2 Image' },
    { field: 'option3' },
    { field: 'option3Image', headerName: 'Option3 Image' },
    { field: 'option4' },
    { field: 'option4Image', headerName: 'Option4 Image' },
    {
      field: 'action',
      headerName: 'Action',
      cellRenderer: 'editDeleteRenderer',
      cellRendererParams: {
        editQuestion: this.openPopup.bind(this),
        deleteQuestion: this.openPopup.bind(this),
      },
    },
  ];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };
  frameworkComponents = {
    editDeleteRenderer: EditDeleteRenderer,
  };
  categoryList: { id: number; itemName: string; name: string }[] = [
    { id: 1, itemName: 'Category A', name: 'A' },
    { id: 2, itemName: 'Category B', name: 'B' },
    { id: 3, itemName: 'Category C', name: 'C' },
    { id: 4, itemName: 'Category D', name: 'D' },
  ];
  selectedCategories: { id: number; itemName: string; name: string }[] = [
    this.categoryList[0],
  ];
  quizList: { id: number; itemName: string; name: number }[] = [
    { id: 1, itemName: 'Demo Quiz', name: 1 },
    { id: 2, itemName: 'Main Quiz', name: 2 },
  ];
  selectedquiz: { id: number; itemName: string; name: number }[] = [
    this.quizList[0],
  ];
  isActiveList: { id: number; itemName: string; name: number }[] = [
    { id: 1, itemName: 'Active', name: 1 },
    { id: 2, itemName: 'In-Active', name: 0 },
  ];
  selectedisActive: { id: number; itemName: string; name: number }[] = [
    this.isActiveList[0],
  ];
  selectSettings = {
    enableSearchFilter: false,
    addNewItemOnFilter: false,
    singleSelection: true,
  };
  gridApi!: GridApi;
  questionRowData: QuestionRowData[] = [];
  questionId!: number;
  questionList: QmQuestionList | [] = [];
  ngOnInit() {
    this.fetchQuestions();
    fromEvent(window, 'resize')
      .pipe(debounceTime(500))
      .subscribe((res) => {
        console.log(res);
        this.gridApi.sizeColumnsToFit();
      });
  }
  fetchQuestions() {
    const queryParams = {
      category: this.selectedCategories[0].name,
      quizType: this.selectedquiz[0].name,
      isActive: this.selectedisActive[0].name,
    };
    this.quizService.getQuestionList(queryParams).subscribe(
      (res: QmQuestionList) => {
        console.log(res);
        this.questionList = res;
        this.generateRowData(res);
      },
      (err) => {
        if (err.status == 404) {
          this.questionRowData = [];
          this.toastrService.info('No Questions to display', 'Error');
        } else {
          this.toastrService.error(err.status, 'error');
        }
      }
    );
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    // this.gridColumnApi = params.columnApi;
  }
  generateRowData(res: QmQuestionList) {
    const questionRowArray: any = [];
    res.questionArray.forEach((questionObj: QuestionArray, qIndex: number) => {
      const questionRowObject: any = {};
      const optionsArray = res.optionArray.filter((option: OptionArray) => {
        return option.questionId == questionObj.questionId;
      });
      questionRowObject['sno'] = qIndex + 1;
      questionRowObject['question'] = questionObj.question
        ? questionObj.question
        : '';
      questionRowObject['questionImage'] = questionObj.questionImage
        ? questionObj.questionImage
        : '';
      questionRowObject['isActive'] =
        questionObj.isActive == 1 ? 'True' : 'False';
      questionRowObject['option1'] = optionsArray[0].options
        ? optionsArray[0].options
        : '';
      questionRowObject['option1Image'] = optionsArray[0].optionImage
        ? optionsArray[0].optionImage
        : '';
      questionRowObject['option2'] = optionsArray[1].options
        ? optionsArray[1].options
        : '';
      questionRowObject['option2Image'] = optionsArray[1].optionImage
        ? optionsArray[1].optionImage
        : '';
      questionRowObject['option3'] = optionsArray[2].options
        ? optionsArray[2].options
        : '';
      questionRowObject['option3Image'] = optionsArray[2].optionImage
        ? optionsArray[2].optionImage
        : '';
      questionRowObject['option4'] = optionsArray[3].options
        ? optionsArray[3].options
        : '';
      questionRowObject['option4Image'] = optionsArray[3].optionImage
        ? optionsArray[3].optionImage
        : '';
      questionRowObject['action'] = questionObj.questionId;
      questionRowArray.push(questionRowObject as QuestionRowData);
    });
    this.questionRowData.length = 0;
    this.questionRowData = questionRowArray;
  }

  onCellClicked(eve: any) {
    console.log(eve.column.getColId());
    this.questionId = eve.value;
    if ((eve.column.getColId() as string).toLowerCase() == 'action') {
      let actionType = eve.event.target.getAttribute('data-action');
      switch (actionType) {
        case 'edit': {
          console.log('Edit action clicked');
          const quizType = (
            this.questionList as QmQuestionList
          ).questionArray.filter((questionObj) => {
            return questionObj.questionId == eve.value;
          })[0].quizType;
          this.quizService.setQuestionType(quizType == 1 ? 'demo' : 'main');
          this.editQuestion();
          break;
        }
        case 'delete': {
          // console.log('Delete action clicked');
          this.openPopup();
          break;
        }
      }
    }
  }
  closePopup(btnName: string) {
    (document.getElementById('confirmPopup') as HTMLDivElement).style.display =
      'none';
    if (btnName == 'delete') {
      this.deleteQuestion();
    }
  }
  openPopup() {
    (document.getElementById('confirmPopup') as HTMLDivElement).style.display =
      'flex';
  }
  editQuestion() {
    console.log('editQuestionFlow');
    this.router.navigateByUrl(`/edit-question/${this.questionId}`);
  }
  deleteQuestion() {
    console.log('delete Question flow');
    this.quizService.deleteQuestion(this.questionId).subscribe(
      (res: any) => {
        this.toastrService.success(res.message, 'Success');
        this.fetchQuestions();
      },
      (err) => {
        this.toastrService.error(err.status, 'Error');
      }
    );
  }
}
