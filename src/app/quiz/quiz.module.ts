import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './quiz.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/shared/modules/shared/shared.module';
import { CountdownGlobalConfig, CountdownModule } from 'ngx-countdown';

const routes: Routes = [
  {
    path: '',
    component: QuizComponent,
  },
];

function countdownConfigFactory(): any {
  return { format: `mm:ss` };
}

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CountdownModule,
    RouterModule.forChild(routes),
  ],
  declarations: [QuizComponent],
  providers: [
    { provide: CountdownGlobalConfig, useFactory: countdownConfigFactory },
  ],
})
export class QuizModule {}
