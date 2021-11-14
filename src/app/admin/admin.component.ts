import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from './../user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, AfterViewInit {
  constructor(private userService: UserService) {}
  user: any;
  ngOnInit(): void {}
  ngAfterViewInit() {
    if (window.sessionStorage.getItem('userData')) {
      this.user = JSON.parse(
        window.sessionStorage.getItem('userData') as string
      );
    }
  }
}
