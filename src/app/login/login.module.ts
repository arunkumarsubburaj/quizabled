import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { SharedModule } from 'src/shared/modules/shared/shared.module';


const routes: Routes = [{
  path: "",
  component: LoginComponent,
}];


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginModule { }