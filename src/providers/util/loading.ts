import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class Loading {

    private loader;

    constructor(
        public loadingCtrl: LoadingController
    ) {

    }

    show() {
        if (!this.loader || !this.loader.instance) {
            this.loader = this.loadingCtrl.create({
                content: 'Aguarde...'
            });
            this.loader.present();
        }
    }

    hide() {
        if (this.loader) {
            this.loader.dismiss();
            this.loader = undefined;
        }
    }
}
