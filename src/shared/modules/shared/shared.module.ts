import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightboxModule } from 'ngx-lightbox';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, LightboxModule, ReactiveFormsModule],
  exports: [LightboxModule, ReactiveFormsModule],
})
export class SharedModule {}
