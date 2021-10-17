import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery.component';
import { SharedModule } from 'src/shared/modules/shared/shared.module';


const routes: Routes = [{
  path: "",
  component: GalleryComponent,
}];


@NgModule({
  declarations: [GalleryComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class GalleryModule { }
