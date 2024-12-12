import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription, tap } from 'rxjs';

@Directive({
  selector: '[appMinMax]'
})
export class MinMaxDirective {

  @Input()
  public appMin?: number;

  @Input()
  public appMax?: number;

  sub = new Subscription();
  constructor(
    // private ref: ElementRef,
    private ngCtrl: NgControl
  ) { }

  ngOnInit() {
    if (this.ngCtrl.control) {
      const control = this.ngCtrl.control
      this.sub.add(control.valueChanges.pipe(tap(
        value => {
          const inputVal = parseInt(value);
          if (isNaN(inputVal)) {
            control.setValue(this.appMin, { emitEvent: false });
            return;
          }
          if (this.appMax !== null && this.appMax !== undefined && inputVal >= this.appMax) {
            control.setValue(this.appMax, { emitEvent: false });
          } else if (this.appMin !== null && this.appMin !== undefined && inputVal <= this.appMin) {
            control.setValue(this.appMin, { emitEvent: false });
          } else {
            control.setValue(inputVal, { emitEvent: false });
          }

        }
      )).subscribe());
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}