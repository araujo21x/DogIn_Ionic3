import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validator } from '@angular/forms';

@Directive({
  selector: '[greater-eighteen]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: GreaterEighteenDirective,
    multi:true
  }]
})
export class GreaterEighteenDirective implements Validator{

  @Input() birthDate:Date;

  public validate(control: AbstractControl): { [key:string]:any } | null {

    if(control.value) {
      const nasc = new Date(control.value).getTime();
      const today = new Date().getTime();
      return Math.floor(Math.ceil(Math.abs(nasc - today) / (1000 * 3600 * 24)) / 365.25) < 18 ? { 'isUnderAge':true } : null;
    }
     


  }

}
//