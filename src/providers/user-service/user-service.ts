import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { User } from '../../models/User';

@Injectable()
export class UserServiceProvider {

  user$:Observable<User>

  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore
  ) 
  {
    this.user$ = this.fireAuth.authState.switchMap(user => (user) ? this.fireStore.doc<User>(`users/${user.uid}`).valueChanges() : Observable.of(null) );
  }

  public async create(user:any, type:string) {
    try {
      const createdUser = await this.fireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      if(createdUser) {
        user.uid = createdUser.user.uid;
        this.updateData(user, type);
        return { success: true};
      }
    } catch(exception) {
      return exception;
    }
  }

  public update(user:any) {
    try {
      const ref: AngularFirestoreDocument<any> = this.fireStore.doc(`users/${user.uid}`);
      const data: User = {
        uid: user.uid,
        name: user.name,
        birthDate: user.birthDate,
        sex: user.sex,
        lastName: user.lastName,
      };
      return ref.set(data, {merge:true});
    } catch(exception) {
      return exception;
    }
  }

  public changeTheme(user:any){
    try{

      const ref: AngularFirestoreDocument<any> = this.fireStore.doc(`users/${user.uid}`);
      const data: any = {
        uid: user.uid,
        theme: user.theme
      };

      return ref.set(data, {merge:true});
      
    } catch(exception){
      return exception;
    }

   }
    
    private updateData(user:any, type:string) {
    const ref: AngularFirestoreDocument<any> = this.fireStore.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      name: user.name,
      birthDate: user.birthDate,
      sex: user.sex,
      registerDate: new Date(),
      lastName: user.lastName,
      active: true,
      roles : {
        admin: false,
        basic: type === 'basic' ? true : false,
        petshop: type === 'petshop' ? true : false,
      }
    };

    this.cleanData(data);

    return ref.set(data, {merge:true});
  };

  private cleanData(data) {
    for(let property in data) {
      if(data[property] === null || data[property] === undefined) {
        delete data[property];
      }
    }
  };

  public getLoggedUser() {
    return this.user$;
  }
}
