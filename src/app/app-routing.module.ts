import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShellComponent } from './shell/shell.component';

const routes: Routes = [{
  path: "",
  component: ShellComponent,
  children: [
    {
      path: "",
      redirectTo: "home",
      pathMatch: "full"
    },
    {
      path: "home",
      component: HomeComponent
    },
    {
      path: "gallery",
      loadChildren: ()=> import ("./gallery/gallery.module").then((m)=>m.GalleryModule)
    },
    {
      path: "login",
      loadChildren: ()=> import ("./login/login.module").then((m)=>m.LoginModule)
    },
    {
      path: "questions",
      loadChildren: ()=> import ("./questions/questions.module").then((m)=>m.QuestionsModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
