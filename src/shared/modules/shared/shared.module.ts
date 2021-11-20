import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightboxModule } from 'ngx-lightbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LightboxModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMultiSelectModule,
  ],
  exports: [
    LightboxModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMultiSelectModule,
  ],
})
export class SharedModule {}
