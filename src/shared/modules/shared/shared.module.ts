import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightboxModule } from 'ngx-lightbox';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LightboxModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  exports: [
    LightboxModule,
    ReactiveFormsModule,
    ToastrModule
  ]
})
export class SharedModule { }
