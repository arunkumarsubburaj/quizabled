import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './quiz.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/shared/modules/shared/shared.module';

const routes: Routes = [{
  path: "",
  component: QuizComponent,
}];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],  
  declarations: [QuizComponent]
})
export class QuizModule { }
