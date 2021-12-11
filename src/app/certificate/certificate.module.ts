import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/shared/modules/shared/shared.module';
import { CertificateComponent } from './certificate.component';

const routes: Routes = [
  {
    path: '',
    component: CertificateComponent,
  },
];

@NgModule({
  declarations: [CertificateComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class CertificateModule {}
