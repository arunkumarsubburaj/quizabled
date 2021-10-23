import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './questions.component';
import { SharedModule } from 'src/shared/modules/shared/shared.module';

const routes: Routes = [{
  path: "",
  component: QuestionsComponent,
}];

@NgModule({
  declarations: [QuestionsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
})
export class QuestionsModule { }
