import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/shared/modules/shared/shared.module';
import { QuizResultComponent } from './quiz-result.component';

const routes: Routes = [
  {
    path: '',
    component: QuizResultComponent,
  },
];

@NgModule({
  declarations: [QuizResultComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class QuizResultModule {}
