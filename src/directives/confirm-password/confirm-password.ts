import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[confirm-password]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ConfirmPasswordDirective,
    multi:true
  }]
})
export class ConfirmPasswordDirective implements Validator {

  @Input() confirmPassword: string;

  public validate(control: AbstractControl): { [key: string]: any } | null {

    const toCompare = control.parent.get('password');

    if(toCompare && toCompare.value !== control.value) {
      return { 'notEqual': true };
    }

    return null;
  }
}
