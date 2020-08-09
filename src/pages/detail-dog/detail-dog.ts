import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { AngularFireStorage } from '@angular/fire/storage';

@IonicPage()
@Component({
  selector: 'page-detail-dog',
  templateUrl: 'detail-dog.html',
})
export class DetailDogPage {
  public dog: any = [];
  public imageDogUrl: any = [];
  public expandMedic: boolean = false;
  public expandBasic: boolean = false;
  public expandComplement: boolean = false;
  public expandHeat: boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public afstorage: AngularFireStorage,
    public modalController: ModalController)
  {
    if(this.navParams.get('dogTransf')){
      this.dog = this.navParams.get('dogTransf');

    }else{
      this.navCtrl.pop();
    }
    if(this.dog.albumPictures){
      this.dog.albumPictures.forEach(index => {
        this.afstorage.ref(index)
        .getDownloadURL()
        .toPromise()
        .then((success) => {
          this.imageDogUrl.push(success);
        }).catch((error) =>{
          console.log(error);
        })
      });
    }
    
  }

 
  public like() {

    let modalInviteLike = this.modalController.create('ModalInviteLikePage',{
      dogToLiked:this.dog
    });

    modalInviteLike.present();

    modalInviteLike.onDidDismiss((message) => {
      console.log('mensagem de retorno: ', message);
    })
  }

  public expand(camp: string, awswer: boolean): void{
    switch(camp) { 
      case 'basic': { 
        this.expandBasic = awswer;
         break; 
      } 
      case 'complement': { 
        this.expandComplement = awswer;
         break; 
      }
      case 'medic' :{
        this.expandMedic = awswer;
      }
      case 'heat' :{
        this.expandHeat = awswer;
      }
    }
  }

}
