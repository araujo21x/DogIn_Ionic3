import { AbstractControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take, debounceTime } from 'rxjs/operators';

export class EmailValidator {

  static isValid(afs: AngularFirestore) {

    return (control:AbstractControl) => {
  
      if(control.value) {
        return afs.collection('users', ref => ref.where('email','==',control.value))
          .valueChanges()
          .pipe(
            debounceTime(500),
            take(1),
            map(arr => arr.length ? { emailValid:false } : null)
          )
      }

    }
  }

}