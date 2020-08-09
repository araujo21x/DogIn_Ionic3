import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Contact } from '../../models/Contact';
import { UserServiceProvider } from '../user-service/user-service';

@Injectable()
export class ContactServiceProvider {
  
  public userLogged:any;

  constructor(public afStore:AngularFirestore,
    public userService:UserServiceProvider)
  {
    this.userService.getLoggedUser()
    .subscribe( loggedUser => {
      this.userLogged = loggedUser;
    })
  }

  public saveMessageContactPage(message: string, topic:string): any{
    let idMessageContact = this.afStore.createId();
    let ref = this.afStore.collection('userContactMessage').doc(idMessageContact);
    let messageContact: Contact = {
      message: message,
      topic: topic,
      user: this.userLogged,
      date: new Date()
    }
    return ref.set(messageContact);

  }
}
