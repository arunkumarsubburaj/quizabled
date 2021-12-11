import { ResourcesComponent } from './resources/resources.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShellComponent } from './shell/shell.component';
import { AuthGuardService as AuthGuard } from './../shared/services/auth-guard.service';
import { AdminComponent } from './admin/admin.component';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentLogComponent } from './student-log/student-log.component';
import { ContactAdminComponent } from './contact-admin/contact-admin.component';
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
        path: 'resources',
        component: ResourcesComponent,
      },
      {
        path: 'gallery',
        loadChildren: () =>
          import('./gallery/gallery.module').then((m) => m.GalleryModule),
      },
      {
        path: 'add-resource',
        component: AddResourceComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'quiz-master',
        loadChildren: () =>
          import('./qm-landing/qm-landing.module').then(
            (m) => m.QmLandingModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'student-list',
        component: StudentDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'contact-admin',
        component: ContactAdminComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'show-log/:id',
        component: StudentLogComponent,
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
        path: 'edit-question/:id',
        loadChildren: () =>
          import('./qm-questions/qm-questions.module').then(
            (m) => m.QmQuestionsModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'question-list',
        loadChildren: () =>
          import('./qm-question-list/qm-question-list.module').then(
            (m) => m.QmQuestionListModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'instructions',
        loadChildren: () =>
          import('./instructions/instruction.module').then(
            (m) => m.InstructionModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./quiz-category/quiz-category.module').then(
            (m) => m.QuizCategoryModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'quiz',
        loadChildren: () =>
          import('./quiz/quiz.module').then((m) => m.QuizModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'result',
        loadChildren: () =>
          import('./quiz-result/quiz-result.module').then(
            (m) => m.QuizResultModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'certificate',
        loadChildren: () =>
          import('./certificate/certificate.module').then(
            (m) => m.CertificateModule
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
  declarations: [],
})
export class AppRoutingModule {}
