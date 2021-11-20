import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/shared/modules/shared/shared.module';
import { ReviewQuizComponent } from './review-quiz.component';

const routes: Routes = [
  {
    path: '',
    component: ReviewQuizComponent,
  },
];

@NgModule({
  declarations: [ReviewQuizComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class ReviewQuizModule {}
