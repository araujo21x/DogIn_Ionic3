import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { Loading } from '../../providers/util/loading';
import { Toast } from '../../providers/util/toast';
//import { EmailValidator } from '../../providers/validators/email.validator';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;

  constructor(public navCtrl: NavController,
    public events: Events,
    public loading: Loading,
    public alertCtrl: AlertController,
    public loginServiceProvider: LoginServiceProvider,
    public userServiceProvider:UserServiceProvider,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public toast: Toast
  ) {

    this.loading.show();

    this.loginForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(2)])
      ]
    });

    this.events.publish('disable:menu');

    this.userServiceProvider.getLoggedUser()
      .subscribe((user) => {
        if(user) {
          this.loading.hide();
          this.navCtrl.setRoot("HomePage");
          this.events.publish('active:menu');
        } else {
          this.loading.hide();
        }
      });
  }

  public goToRegister() {
    this.navCtrl.push('RegisterUserPage');
  }

  public goTorRecoverPassword() {
    this.navCtrl.push('RecoverPasswordPage');
  }

  public login() {

    this.loading.show();

    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.loginServiceProvider.login(user)
      .then(authData => {
        this.loading.hide();
        this.navCtrl.setRoot('HomePage');
        this.events.publish('active:menu');
      })
      .catch(error => {
        this.loading.hide();
        this.toast.onError(error);
      });
  }

}
