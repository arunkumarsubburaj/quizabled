import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/shared/modules/shared/shared.module';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './login.service';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  providers: [ToastrService, LoginService],
})
export class LoginModule {}
