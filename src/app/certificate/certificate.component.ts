import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from '../user.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss'],
})
export class CertificateComponent implements OnInit {
  particiapatedData!: Date;
  participantName = 'MOCK PARTICIPANT';
  participantInstitution = 'Example School';
  user!: UserInfo;
  constructor() {}
  ngOnInit() {
    this.user = JSON.parse(
      window.sessionStorage.getItem('userData') as string
    ) as UserInfo;
    this.particiapatedData = new Date(+this.user.startTime as number);
    this.participantName = this.user.name;
    this.participantInstitution = this.user.institution;
  }
  printCertificate() {
    window.print();
  }
}
