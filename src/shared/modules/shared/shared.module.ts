import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightboxModule } from 'ngx-lightbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LightboxModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMultiSelectModule,
    AgGridModule.withComponents([]),
  ],
  exports: [
    LightboxModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMultiSelectModule,
    AgGridModule,
  ],
})
export class SharedModule {}
