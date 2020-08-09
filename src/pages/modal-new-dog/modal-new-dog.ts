import { Component, ViewChild } from '@angular/core';
import { IonicPage, ViewController, Slides, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DogServiceProvider } from '../../providers/dog-service/dog-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { take, map } from 'rxjs/operators';
import { Loading } from '../../providers/util/loading';
import { Toast } from '../../providers/util/toast';

@IonicPage()
@Component({
  selector: 'page-modal-new-dog',
  templateUrl: 'modal-new-dog.html',
})
export class ModalNewDogPage {
  @ViewChild(Slides) slides: Slides;

  theme:string;
  dog: any = { uidUser: '' };
  dogForm: FormGroup;
  dogUid: string;

  constructor(
    public viewctrl: ViewController,
    public dogServiceProvider: DogServiceProvider,
    public formBuilder: FormBuilder,
    public userService: UserServiceProvider,
    public loading: Loading,
    public toast: Toast
  ) {
    this.dogForm = formBuilder.group({
      name: ["", [Validators.required]],
      sex: ["", [Validators.required]],
      birthDay: ["", [Validators.required]],
      breed: ["", [Validators.required]],
      fur: ["", [Validators.required]],
      furType: ["", [Validators.required]],
      temperament:["",[Validators.required]]
    });

    this.userService.getLoggedUser().subscribe(user => {
      if(user.theme) {
        this.theme = user.theme;
      } else {
        this.theme = 'blue-theme';
      }
      this.dog.uidUser = user.uid
    });
  }

  ionViewDidLoad() {
    this.slides.onlyExternal = true;
    this.slides.lockSwipes(true);
  }

  public addDog(): void {
    this.loading.show();

    this.dogServiceProvider.saveDog(this.dog)
      .then(result => {
        this.loading.hide();
        this.toast.show('Seu novo pet foi cadastrado com sucesso');
        this.dogServiceProvider.returnUidDog();
        this.next();
      })
      .catch(err => {
        this.loading.hide();
        this.toast.onError(err);
      })
  }

  public dismiss(answer: boolean){
    if(answer){
      this.viewctrl.dismiss(this.dogServiceProvider.returnUidDog());
    }else{
      this.viewctrl.dismiss();
    }
  }

  private next(): void {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  private prev(): void {
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }

  public alertTemperament(messageTemperament: string): void{
    this.toast.showTemperament(messageTemperament);
  }
}
