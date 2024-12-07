import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinMaxDirective } from './min-max.directive';
import { OnlyNumberDirective } from './only-number.directive';



@NgModule({
  declarations: [
    MinMaxDirective,
    OnlyNumberDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MinMaxDirective,
    OnlyNumberDirective
  ]
})
export class SharedDirectiveModule { }
