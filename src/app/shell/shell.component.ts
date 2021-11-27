import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { QuizService } from '../quiz.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit, AfterViewInit {
  isLoggedIn: boolean = false;
  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private router: Router,
    private quizService: QuizService
  ) {
    // this.userService.setUser({});
  }
  user: any;
  isDemoUser: boolean = false;
  fontClass: string = '';
  isMenuOpen: boolean = false;
  ngOnInit() {}
  ngAfterViewInit() {
    if (window.sessionStorage.getItem('userData')) {
      this.user = JSON.parse(
        window.sessionStorage.getItem('userData') as string
      );
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
    if (window.sessionStorage.getItem('isDemoUser') == 'true') {
      this.isDemoUser = true;
    }
  }
  logout() {
    this.router.navigateByUrl('/');
    var n = sessionStorage.length;
    while (n--) {
      var key: string = sessionStorage.key(n) as string;
      sessionStorage.removeItem(key);
    }
    this.quizService.setDemoSession(false);
    this.isLoggedIn = false;
    this.isDemoUser = false;
    this.loginService.logout();
    this.userService.setUser({});
  }
  goToDemo() {
    window.sessionStorage.setItem('isDemoUser', 'true');
    this.quizService.setDemoSession(true);
    this.userService.setLoginStatus(true);
    this.isDemoUser = true;
    this.router.navigateByUrl('/instructions');
  }
  changeFont(event: MouseEvent, fontSize: string) {
    const fontBtns = document.querySelectorAll('.fontSizeChange button');
    const htmlEle: any = document.querySelector('html');
    htmlEle.classList.remove('fsSmall');
    htmlEle.classList.remove('fsLarge');
    fontBtns.forEach((fontBtn) => {
      fontBtn.classList.remove('active');
    });
    (event.currentTarget as HTMLButtonElement).classList.add('active');
    switch (fontSize) {
      case 'small':
        htmlEle.classList.add('fsSmall');
        break;
      case 'default':
        break;
      case 'large':
        htmlEle.classList.add('fsLarge');
        break;
      default:
        break;
    }
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.classList.add('noScroll');
    } else {
      document.body.classList.remove('noScroll');
    }
  }
}
