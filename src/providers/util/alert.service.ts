import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Loading } from 'ionic-angular';

@Injectable()
export class AlertService {

    loading: Loading;
        
    constructor(
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController
    ) 
    {

    }

    showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Aguarde...',
            dismissOnPageChange: true
        });
        return this.loading.present();
    }

    hideLoading() {
        return this.loading.dismiss();
    }

    presentAlert(title: string, message: string) {
        let alert = this.alertCtrl.create(
            {
                title: title,
                subTitle: message,
                buttons: [
                    {
                        text: 'OK'
                    }
                ]
            })

        return alert.present();
    }

    presentErrorAlert(message: string) {
        return this.presentAlert("An error has occurred.", message);
    }

    presentAlertWithCallback(title: string, message: string): Promise<boolean> {

        return new Promise((resolve, reject) => {
            const confirm = this.alertCtrl.create({
                title,
                message,
                buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        confirm.dismiss().then(() => resolve(false));
                    }
                }, {
                    text: 'Yes',
                    handler: () => {
                        confirm.dismiss().then(() => resolve(true));
                    }
                }]
            });

            return confirm.present();
        });
        
    }

}