import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShellComponent } from './shell/shell.component';
import { AuthGuardService as AuthGuard } from './../shared/services/auth-guard.service';
import { AdminComponent } from './admin/admin.component';
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
        path: 'quiz',
        loadChildren: () =>
          import('./quiz/quiz.module').then((m) => m.QuizModule),
      },
      {
        path: 'gallery',
        loadChildren: () =>
          import('./gallery/gallery.module').then((m) => m.GalleryModule),
      },
      {
        path: 'questions',
        loadChildren: () =>
          import('./questions/questions.module').then((m) => m.QuestionsModule),
        canActivate: [AuthGuard],
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
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
