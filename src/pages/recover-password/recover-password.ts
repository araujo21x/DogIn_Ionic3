import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController,  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginServiceProvider } from '../../providers/login-service/login-service';

import { ViewController } from 'ionic-angular'; //Import pra alterar o texto do 'back button'

@IonicPage()
@Component({
  selector: 'page-recover-password',
  templateUrl: 'recover-password.html',
})
export class RecoverPasswordPage {
  recoverPasswordForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loginServiceProvider: LoginServiceProvider,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public viewCtrl: ViewController //Parâmetro pra alterar o texto do 'back button'
    )
    {
      this.recoverPasswordForm = formBuilder.group({
        email:[
          "",
          Validators.compose([Validators.required])
        ]
      });
    }

  public goToRegister() {
    this.navCtrl.push('RegisterUserPage');
  }

  private recoverPassword(): void{
    if(!this.recoverPasswordForm.valid){
      console.log("erro");
    } else {
      const email: string = this.recoverPasswordForm.value.email;
      this.loginServiceProvider.recoverPassword(email).then(
        user => {
          const alert:Alert = this.alertCtrl.create({
            message: "Veja n seu email o link de recuperação",
            buttons: [{
              text:"OK",
              role:"cancelar",
              handler:() =>{
                this.navCtrl.pop();
              }
            }]
          });
          alert.present();
        }
      );
    }
  }

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('Voltar');
  }

}
