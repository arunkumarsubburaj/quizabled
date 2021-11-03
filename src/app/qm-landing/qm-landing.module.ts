import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QmLandingComponent } from './qm-landing.component';
import { SharedModule } from 'src/shared/modules/shared/shared.module';


const routes: Routes = [{
  path: "",
  component: QmLandingComponent,
}];


@NgModule({  
  declarations: [QmLandingComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class QmLandingModule { }
