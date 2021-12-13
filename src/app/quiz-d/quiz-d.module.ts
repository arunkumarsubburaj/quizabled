import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizDComponent } from './quiz-d.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/shared/modules/shared/shared.module';
import { CountdownGlobalConfig, CountdownModule } from 'ngx-countdown';

const routes: Routes = [
  {
    path: '',
    component: QuizDComponent,
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
  declarations: [QuizDComponent],
  providers: [
    { provide: CountdownGlobalConfig, useFactory: countdownConfigFactory },
  ],
})
export class QuizDModule {}
