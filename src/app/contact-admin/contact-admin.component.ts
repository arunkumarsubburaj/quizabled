import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.component.html',
  styleUrls: ['./contact-admin.component.scss'],
})
export class ContactAdminComponent implements OnInit {
  status!: number;
  endTime!: number;
  constructor(private router: Router) {}

  ngOnInit() {
    this.status = window.history.state.quizStatus;
    this.endTime = window.history.state.endTime;
  }
  gotoCertificate() {
    this.router.navigateByUrl('certificate');
  }
}
