import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QmQuestionsComponent } from './qm-questions.component';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { SharedModule } from 'src/shared/modules/shared/shared.module';

const routes: Routes = [{
  path: "",
  component: QmQuestionsComponent,
}];

@NgModule({
  declarations: [QmQuestionsComponent],
  imports: [
    CommonModule,
    SharedModule,
    SelectDropDownModule,
    RouterModule.forChild(routes)
  ]
})
export class QmQuestionsModule { }
