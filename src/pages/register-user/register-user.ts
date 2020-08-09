import { Component } from '@angular/core';
import { IonicPage, NavController, Events, ModalController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Loading } from '../../providers/util/loading';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { AngularFirestore } from '@angular/fire/firestore';

import { EmailValidator } from '../../providers/validators/email.validator';
import { Toast } from '../../providers/util/toast';

import { ViewController } from 'ionic-angular'; //Import pra alterar o texto do 'back button'

@IonicPage()
@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})
export class RegisterUserPage {

  acceptTerm: Boolean = false;

  basicForm: FormGroup;

  user: any = {};

  constructor
    (
      public navCtrl: NavController,
      public formBuilder: FormBuilder,
      public events:Events,
      public userService: UserServiceProvider,
      public loginService: LoginServiceProvider,
      public loading: Loading,
      public toast: Toast,
      public fireStore: AngularFirestore,
      public modalController: ModalController,
      public viewCtrl: ViewController //Parâmetro pra alterar o texto do 'back button'
    ) {
      
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.basicForm = this.formBuilder.group({
      email: ['', 
        Validators.compose([
          Validators.required,
          Validators.pattern(emailRegex),
        ]),
        EmailValidator.isValid(this.fireStore)
      ],
      sex: ['',[Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      reTypePassword: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthDate: ['', 
        Validators.compose([
          Validators.required
        ]),
        
      ]      
    });

  }

  public openTerms() {
    let modal = this.modalController.create("TermsPage");

    modal.present();

    modal.onDidDismiss(data => {
      if(data.accept) { this.acceptTerm = data.accept }
    });
  }

  public cancelTerms() {
    this.acceptTerm = false;
  }
  
  public onSubmitForm(type:string) {

    if(type === 'basic' && !this.basicForm.invalid) {
      this.register(type);

    }

  }

  private register(type: string) {
    this.loading.show();
    this.userService.create(this.user, type)
      .then((response:any) => (response.code) ? this.loading.hide() : this.successRegister(this.loading))
      .catch((err:any) => this.loading.hide())
  }

  private successRegister(loading) {
    this.loginService.login(this.user)
      .then(() => {
        this.events.publish('login:success');
        loading.hide();
        this.navCtrl.setRoot('HomePage');
      })
      .catch((err:any) => {
        this.events.publish('login:error');
        loading.hide();
      })
  }

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('Voltar');
  }

}
