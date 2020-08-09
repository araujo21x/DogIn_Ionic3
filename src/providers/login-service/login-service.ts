import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable()
export class LoginServiceProvider {

  constructor(private authFireService: AngularFireAuth) { }
  
  login(user: any): Promise<firebase.auth.UserCredential> {
    return this.authFireService.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  public recoverPassword(email:string): Promise<void>{
    return this.authFireService.auth.sendPasswordResetEmail(email);
  }
  
  public logout(): Promise <void>{
    return this.authFireService.auth.signOut();
  }

}
