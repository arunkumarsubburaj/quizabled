import { AdminService } from './../admin.service';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi } from 'ag-grid-community';
import { EditDeleteRenderer } from './edit-delete-button.component';
import { forkJoin, fromEvent } from 'rxjs';
import { StudentData } from './student.model';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent implements OnInit {
  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private adminService: AdminService,
    private quizService: QuizService
  ) {}
  studentId!: number;
  studentData: StudentData[] = [];
  currentstudentData!: StudentData;
  columnDefs: ColDef[] = [
    { field: 'name', headerName: 'Name' },
    { field: 'user_name', headerName: 'User Name' },
    { field: 'dob', headerName: 'Date Of Birth' },
    { field: 'institution', headerName: 'Institution' },
    { field: 'email', headerName: 'Email' },
    { field: 'city', headerName: 'City' },
    { field: 'phone', headerName: 'Phone No' },
    { field: 'q_category', headerName: 'Quiz Category' },
    { field: 'age', headerName: 'Age', width: 150 },
    { field: 'totalMarks', headerName: 'Mark', width: 150 },
    {
      field: 'isAttended',
      headerName: 'Status',
      width: 150,
      cellRenderer: (params) => {
        let returnString = '';
        if (params.value == 1) {
          returnString = `<span class="statusBtn yellow" title='In-progress'></span>`;
        } else if (params.value == 2) {
          returnString = `<span class="statusBtn green" title='Completed'></span>`;
        } else {
          returnString = `<span class="statusBtn red title='Not attended'"></span>`;
        }
        return returnString;
      },
    },
    {
      field: 'startTime',
      headerName: 'Started At',
      cellRenderer: (params) => {
        return params.value ? new Date(+params.value).toLocaleString() : '';
      },
    },
    {
      field: 'endTime',
      headerName: 'Ended At',
      cellRenderer: (params) => {
        return params.value ? new Date(+params.value).toLocaleString() : '';
      },
    },
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
  gridApi!: GridApi;

  ngOnInit() {
    this.fetchStudentList();
    fromEvent(window, 'resize')
      .pipe(debounceTime(500))
      .subscribe((res) => {
        this.gridApi.sizeColumnsToFit();
      });
  }
  fetchStudentList() {
    this.adminService.getStudentList().subscribe(
      (res) => {
        this.studentData = res;
      },
      (err) => {
        this.toastrService.error(err.error);
      }
    );
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }
  onCellClicked(eve: any) {
    this.studentId = eve.data.id;
    this.currentstudentData = eve.data;
    if ((eve.column.getColId() as string).toLowerCase() == 'action') {
      let actionType = eve.event.target.getAttribute('data-action');
      switch (actionType) {
        case 'showLog':
          this.router.navigateByUrl(`/show-log/${this.studentId}`);
          break;
        case 'resetLog':
          this.openPopup();
          break;
        case 'getMarks':
          this.updateMarks();
      }
    }
  }
  updateMarks() {
    if (
      this.currentstudentData.isAttended == 2 ||
      this.currentstudentData.endTime != null
    ) {
      const stundetId = this.studentId.toString();
      let questionsAnswered = 0;
      const AnswersEndPoint = this.quizService.getAnswers({
        quizType: 2,
        category: this.currentstudentData.q_category,
        language: 'en',
      });
      const studentLogEndPoint = this.adminService.showQuizLog(stundetId);
      forkJoin([AnswersEndPoint, studentLogEndPoint]).subscribe(
        (res) => {
          const resultArray = res[1];
          const answerArray = res[0];
          resultArray.forEach((resultObj) => {
            const answerObj = answerArray.filter((answerObj) => {
              return answerObj.questionId == +resultObj.questionId;
            })[0];
            if (
              resultObj.selectedOptionId &&
              resultObj.selectedOptionId == answerObj.optionId
            ) {
              questionsAnswered += 1;
            }
          });
          this.updateMarksToTable(questionsAnswered);
        },
        (err) => {
          this.toastrService.error(err);
        }
      );
    } else {
      this.toastrService.info('Student not completed the Quiz yet....');
    }
  }
  updateMarksToTable(mark: number) {
    this.adminService
      .updateMarks({ totalMark: mark, studentId: this.studentId })
      .subscribe(
        (res) => {
          this.fetchStudentList();
        },
        (err) => {
          this.toastrService.error(err);
        }
      );
  }
  closePopup(btnName: string) {
    (document.getElementById('confirmPopup') as HTMLDivElement).style.display =
      'none';
    if (btnName == 'delete') {
      this.unlockStudent();
    }
  }
  openPopup() {
    (document.getElementById('confirmPopup') as HTMLDivElement).style.display =
      'flex';
  }
  unlockStudent() {
    this.adminService.unlockStudent(this.studentId).subscribe(
      (res) => {
        this.toastrService.success('Student Unlocked successfully!!!');
        this.fetchStudentList();
      },
      (err) => {
        this.toastrService.error(err);
      }
    );
  }
}
