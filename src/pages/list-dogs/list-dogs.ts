import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Modal, AlertController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { DogServiceProvider } from '../../providers/dog-service/dog-service';
import { Toast } from '../../providers/util/toast';

@IonicPage()
@Component({
  selector: 'page-list-dogs',
  templateUrl: 'list-dogs.html',
})
export class ListDogsPage {
  
  public myDogs: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalctrl: ModalController,
    public userServiceProvider: UserServiceProvider,
    public dogServiceProvider: DogServiceProvider,
    public toast: Toast,
    public alertCtrl: AlertController)
  {
    this.listDogs();
  }

  public listDogs(): void{
    this.userServiceProvider.getLoggedUser()
    .subscribe(user => {
      if(user){
        this.dogServiceProvider.getUserDogs(user.uid)
        .subscribe(list => {
          this.myDogs = list;
        });
      }
    });
  }

  public goToNewDog(): void {
    let newDogModal = this.modalctrl.create('ModalNewDogPage');
    newDogModal.present();

    newDogModal.onDidDismiss((uid) => {
      if(uid){
        this.goToEditDog(uid);
      }
    });
  }

  public goToEditDog(uid: string): void {
    let dogEdit: any;
    
    this.myDogs.forEach(dog => {
      if(dog.uid == uid){
        dogEdit = dog;
      }
    });

    this.navCtrl.push('EditDogPage', {dogTransf: dogEdit});
  }

  public deleteDog(dog: any): void {
    dog.status = false
    
    let alert = this.alertCtrl.create({
      title: 'Apagar Cachorro!',
      message: 'Realmente deseja apagar o Cachorro?',
      buttons: [
        {
          text: 'Não',
          role: 'Não',
          handler: () => {
            this.toast.show("Cancelado!");
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.dogServiceProvider.EditDog(dog);
            this.toast.show("Apagado com sucesso!");
          }
        }
      ]
    });
    alert.present();
  }

}
