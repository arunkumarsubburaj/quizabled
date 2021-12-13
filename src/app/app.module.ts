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
import { ResourcesComponent } from './resources/resources.component';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentLogComponent } from './student-log/student-log.component';
import { ContactAdminComponent } from './contact-admin/contact-admin.component';
import { ClosedComponent } from './closed/closed.component';
import { NotStartedComponent } from './not-started/not-started.component';

@NgModule({
  declarations: [		
    AppComponent,
    ShellComponent,
    HomeComponent,
    LoaderComponent,
    AdminComponent,
    LoginComponent,
    ResourcesComponent,
    AddResourceComponent,
    StudentDetailsComponent,
    StudentLogComponent,
    ContactAdminComponent,
      ClosedComponent,
      NotStartedComponent
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
