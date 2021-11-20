import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShellComponent } from './shell/shell.component';
import { AuthGuardService as AuthGuard } from './../shared/services/auth-guard.service';
import { AdminComponent } from './admin/admin.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { QuizCategoryComponent } from './quiz-category/quiz-category.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { ReviewQuizComponent } from './review-quiz/review-quiz.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'gallery',
        loadChildren: () =>
          import('./gallery/gallery.module').then((m) => m.GalleryModule),
      },
      {
        path: 'quiz-master',
        loadChildren: () =>
          import('./qm-landing/qm-landing.module').then(
            (m) => m.QmLandingModule
          ),
        // canActivate: [AuthGuard],
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add-questions',
        loadChildren: () =>
          import('./qm-questions/qm-questions.module').then(
            (m) => m.QmQuestionsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'instructions',
        component: InstructionsComponent,
      },
      {
        path: 'category',
        component: QuizCategoryComponent,
      },
      {
        path: 'quiz',
        loadChildren: () =>
          import('./quiz/quiz.module').then((m) => m.QuizModule),
      },
      {
        path: 'result',
        component: QuizResultComponent,
      },
      {
        path: 'review',
        component: ReviewQuizComponent,
      },
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
