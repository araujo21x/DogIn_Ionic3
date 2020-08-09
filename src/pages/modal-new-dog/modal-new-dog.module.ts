import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalNewDogPage } from './modal-new-dog';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ModalNewDogPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalNewDogPage),
    TranslateModule.forChild()
  ],
})
export class ModalNewDogPageModule {}
