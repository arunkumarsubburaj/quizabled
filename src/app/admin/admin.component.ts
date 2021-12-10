import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, AfterViewInit {
  constructor(private router: Router) {}
  user: any;
  ngOnInit(): void {}
  ngAfterViewInit() {
    if (window.sessionStorage.getItem('userData')) {
      this.user = JSON.parse(
        window.sessionStorage.getItem('userData') as string
      );
    }
  }
  gotoResources() {
    this.router.navigateByUrl('/add-resource');
  }
  gotoStudentDetails() {
    this.router.navigateByUrl('/student-list');
  }
}
