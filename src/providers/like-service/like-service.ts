import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserServiceProvider } from '../user-service/user-service';
import { Like } from '../../models/Like';


@Injectable()
export class LikeServiceProvider {

  userLogged:any;

  constructor(
    private afStore: AngularFirestore,
    private userService: UserServiceProvider
  ) 
  {
    this.userService.getLoggedUser()
      .subscribe(loggedUser => {
        this.userLogged = loggedUser;
      })
    
  }

  public getLikesToUser() {
    return this.afStore.collection('likes', ref => ref.where('uidReiceve','==',this.userLogged.uid) ).valueChanges();
  }

  public like(like:any) {

    const likeUid = this.afStore.createId();

    let ref = this.afStore.collection('likes').doc(likeUid);

    let newLike: Like = {
      dateSend: new Date(),
      message: like.message,
      status: like.status,
      uidDog: like.uidDog,
      uidLike: likeUid,
      uidReiceve: like.uidReiceve,
      uidSend: this.userLogged,
      answer: false
    };

    return ref.set(newLike);
  }

  public editLike(like: any){
    let ref = this.afStore.collection('likes').doc(like.uidLike);

    let editLike: Like = {
      dateSend: new Date(),
      message: like.message,
      status: like.status,
      uidDog: like.uidDog,
      uidLike: like.uidLike,
      uidReiceve: like.uidReiceve,
      uidSend: like.uidSend,
      answer: false
    }

    return ref.set(editLike);
  }

  public answerLike(like: any){
    const likeUid = this.afStore.createId();

    let ref = this.afStore.collection('likes').doc(likeUid);
    
    let newLike: Like = {
      dateSend: new Date(),
      message: like.message,
      status: like.status,
      uidDog: like.uidDog,
      uidLike: likeUid,
      uidReiceve: like.uidReiceve,
      uidSend: this.userLogged,
      answer: true,
      replyMessage: like.replyMessage != null ? like.replyMessage : null
      
    };

    return ref.set(newLike);

  }

}
