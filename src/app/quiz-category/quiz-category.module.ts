import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/shared/modules/shared/shared.module';
import { QuizCategoryComponent } from './quiz-category.component';

const routes: Routes = [
  {
    path: '',
    component: QuizCategoryComponent,
  },
];

@NgModule({
  declarations: [QuizCategoryComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [],
})
export class QuizCategoryModule {}
