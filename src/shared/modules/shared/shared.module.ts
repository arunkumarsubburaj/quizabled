import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightboxModule } from 'ngx-lightbox';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LightboxModule
  ],
  exports: [
    LightboxModule
  ]
})
export class SharedModule { }
