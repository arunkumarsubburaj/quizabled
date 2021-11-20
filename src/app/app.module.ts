import { LoginComponent } from './login/login.component';
import { SharedModule } from './../shared/modules/shared/shared.module';
import { AuthGuardService } from './../shared/services/auth-guard.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShellComponent } from './shell/shell.component';
import { HomeComponent } from './home/home.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderInterceptor } from './loader.interceptor';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from 'src/shared/services/auth.service';
import { AdminComponent } from './admin/admin.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { ReviewQuizComponent } from './review-quiz/review-quiz.component';
import { QuizCategoryComponent } from './quiz-category/quiz-category.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';

@NgModule({
  declarations: [	
    AppComponent,
    ShellComponent,
    HomeComponent,
    LoaderComponent,
    AdminComponent,
    LoginComponent,
    InstructionsComponent,
    ReviewQuizComponent,
    QuizCategoryComponent,
      QuizResultComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  exports: [HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    AuthGuardService,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
