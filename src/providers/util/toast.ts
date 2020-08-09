import { Injectable } from '@angular/core';
import { ToastController, Events } from 'ionic-angular';

@Injectable()
export class Toast {

    private toast: any;
    private previousMessage: string;

    constructor(
        public toastCtrl: ToastController,
        public events: Events
    ) {

    }

    public show(message: any, okButton = false, duration = 5000): void {

        this.toast = this.toastCtrl.create({
            message: message,
            duration: okButton ? null : duration,
            position: 'bottom',
            showCloseButton: okButton,
            closeButtonText: 'OK'
        });

        this.toast.onDidDismiss(() => {
            this.previousMessage = undefined;
        });

        if (this.toast.data.message !== this.previousMessage) {
            this.toast.present();
            this.previousMessage = message;
        }
    }

    public onError(error: any) {
        switch (error.code) {

            case "auth/invalid-email":
                this.show("Favor verificar e-mail e senha.");
                break;

            case "auth/user-not-found":
                this.show("E-mail errado!");
                break;


            case "auth/wrong-password":
                this.show("Senha inválida!");
                break;


            case "auth/too-many-requests":
                this.show("Muitas tentativas de login malsucedidas! Tente novamente mais tarde.");
                break;

            default:
                this.show('Ocorreu um erro inesperado');
                break;
        }
    }

    public showTemperament(message: any, okButton = false, duration = 5000): void{
        this.toast = this.toastCtrl.create({
            message: message,
            duration: okButton ? null : duration,
            position: 'top',
            showCloseButton: okButton,
            closeButtonText: 'OK'
        });

        this.toast.onDidDismiss(() => {
            this.previousMessage = undefined;
        });

        if (this.toast.data.message !== this.previousMessage) {
            this.toast.present();
            this.previousMessage = message;
        }
    }
}