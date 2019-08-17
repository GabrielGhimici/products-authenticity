import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[compareTo]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CompareValidatorDirective,
    multi: true
  }],
})
export class CompareValidatorDirective implements OnChanges {
  private validator: ValidatorFn;
  private onChange: () => void;

  @Input('compareTo') compare: string;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('compare' in changes) {
      this._createValidator();
      if (this.onChange) {
        this.onChange();
      }
    }
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.validator(c);
  }

  registerOnValidatorChange(fn: () => void): void {
    this.onChange = fn;
  }

  private _createValidator(): void {
    this.validator = (c: AbstractControl): ValidationErrors | null => {
      if (c.value === null || c.value.length === 0) {
        return null;
      }
      const controlToCompare = c.root.get(this.compare);

      if (controlToCompare) {
        const subscription: Subscription = controlToCompare.valueChanges.subscribe(() => {
          c.updateValueAndValidity();
          subscription.unsubscribe();
        });
      }

      return controlToCompare && controlToCompare.value !== c.value ? {compare: true} : null;
    };
  }

}
