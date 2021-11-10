import { UserService } from './../user.service';
import { AfterContentInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qm-landing',
  templateUrl: './qm-landing.component.html',
  styleUrls: ['./qm-landing.component.scss'],
})
export class QmLandingComponent implements OnInit, AfterContentInit {
  constructor(private userService: UserService) {}
  user: any;
  ngOnInit() {}
  ngAfterContentInit(): void {
    this.userService.getUser().subscribe((res) => {
      this.user = res;
    });
  }
}
