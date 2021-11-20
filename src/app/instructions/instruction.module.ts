import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/shared/modules/shared/shared.module';
import { InstructionsComponent } from './instructions.component';

const routes: Routes = [
  {
    path: '',
    component: InstructionsComponent,
  },
];

@NgModule({
  declarations: [InstructionsComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class InstructionModule {}
