import { LogObj } from './../student-details/student.model';
import { debounceTime } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi } from 'ag-grid-community';
import { fromEvent } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-student-log',
  templateUrl: './student-log.component.html',
  styleUrls: ['./student-log.component.scss'],
})
export class StudentLogComponent implements OnInit {
  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private adminService: AdminService,
    private userService: UserService
  ) {}
  studentName: string = '';
  studentId!: string;
  studentLogData: LogObj[] = [];
  columnDefs: ColDef[] = [
    { field: 'questionNo', headerName: 'Q.No', width: 50, resizable: false },
    {
      field: 'questionId',
      headerName: 'Question ID',
      width: 100,
      resizable: false,
    },
    { field: 'question', headerName: 'Question Value' },
    {
      field: 'selectedOptionId',
      headerName: 'Seleccted Option ID',
      width: 100,
      resizable: false,
    },
    { field: 'selectedValue', headerName: 'Selected Value' },
  ];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };
  gridApi!: GridApi;

  ngOnInit() {
    fromEvent(window, 'resize')
      .pipe(debounceTime(500))
      .subscribe((res) => {
        console.log(res);
        this.gridApi.sizeColumnsToFit();
      });
    const pathArray = location.pathname.split('/');
    this.studentId = pathArray[pathArray.length - 1];
    this.userService.fetchUser(this.studentId).subscribe(
      (res: { name: string; user_name: string; id: number }) => {
        this.studentName = res.name;
      },
      (err) => {
        console.log(err);
      }
    );
    this.fetchStudentList();
  }
  fetchStudentList() {
    this.adminService.showQuizLog(this.studentId).subscribe(
      (res) => {
        this.studentLogData = res;
      },
      (err) => {
        this.toastrService.error(err.error);
      }
    );
  }
  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    // this.gridColumnApi = params.columnApi;
  }
}
