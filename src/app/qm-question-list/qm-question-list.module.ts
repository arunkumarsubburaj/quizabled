import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QmQuestionListComponent } from './qm-question-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/shared/modules/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: QmQuestionListComponent,
  },
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [QmQuestionListComponent],
})
export class QmQuestionListModule {}
