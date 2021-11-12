import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightboxModule } from 'ngx-lightbox';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LightboxModule,
    ReactiveFormsModule,
    AngularMultiSelectModule,
  ],
  exports: [LightboxModule, ReactiveFormsModule, AngularMultiSelectModule],
})
export class SharedModule {}
