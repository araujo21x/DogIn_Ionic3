import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import { LikeServiceProvider } from '../../providers/like-service/like-service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public list: any = [];
  public expandMyInterest: boolean;
  public expandInterestedInMe: boolean;
  public expandOpened: boolean;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public likeService: LikeServiceProvider,
    public alertCrtl: AlertController
    ) 
  {
    setTimeout(() => {
      this.likeService.getLikesToUser()
      .subscribe(likeList => {
        this.list = likeList;
      })
    },2000)

  }

  public likeFunction(like: any): void{

    like.status = "positive";

    this.likeService.editLike(like)
      .then(success => {
        console.log("editLike" + success);
      })
      .catch(err => {
        console.log("editLike" + err);
      });

      let replyMessage: string;
      
      const prompt = this.alertCrtl.create({
        title: 'Mensagem de Resposta',
        message: 'Mande uma mensagem para ' + like.uidSend.name,
        inputs: [
          {
            name: 'message',
            placeholder: 'Ex: Seu numero para Contado'
          },
        ],
        buttons: [
          {
            text: 'Não',
            handler: data =>{
              let answerLike = {
                dateSend: new Date(),
                message: like.message,
                status: like.status,
                uidLike: like.uidLike,
                uidDog: like.uidDog,
                uidReiceve: like.uidSend.uid,
                uidSend: like.uidReiceve,
                replyMessage: "não foi enviada mensagem"
              }
              this.likeService.answerLike(answerLike);
            }
          },
          {
            text:'Enviar',
            handler: data =>{
              let answerLike = {
                dateSend: new Date(),
                message: like.message,
                status: like.status,
                uidLike: like.uidLike,
                uidDog: like.uidDog,
                uidReiceve: like.uidSend.uid,
                uidSend: like.uidReiceve,
                replyMessage: data.message
              }
              this.likeService.answerLike(answerLike);
            }
          }
        ]
      });
      prompt.present();

    /*let answerLike = {
      dateSend: new Date(),
      message: like.message,
      status: like.status,
      uidLike: like.uidLike,
      uidDog: like.uidDog,
      uidReiceve: like.uidSend.uid,
      uidSend: like.uidReiceve,
      replyMessage: replyMessage
    }
    this.likeService.answerLike(answerLike);*/
    
  }

  public deslike(like: any): void{
    like.status = "negative";
    this.likeService.editLike(like)
      .then(success => {
        console.log("editLike" + success);
      })
      .catch(err => {
        console.log("editLike" + err);
      });

    let answerLike = {
      dateSend: new Date(),
      message: like.message,
      status: like.status,
      uidLike: like.uidLike,
      uidDog: like.uidDog,
      uidReiceve: like.uidSend,
      uidSend: like.uidReiceve
    }
    this.likeService.answerLike(answerLike)
      .then( success => {
        console.log("editLike" + success);
      })
      .catch( err => {
        console.log("editLike" + err);
      });
  }

  public expand(camp: string, awswer: boolean): void{
    switch(camp) { 
      case 'myInterest': { 
        this.expandMyInterest = awswer;
        break; 
      }
      case 'interestedInMe': {
        this.expandInterestedInMe = awswer;
        break;
      }
      case 'opened': {
        this.expandOpened = awswer;
        break;
      }
    }
  }

}
