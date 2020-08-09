import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TinderDogPage } from './tinder-dog';
import { TranslateModule } from '@ngx-translate/core';
import { SwingModule } from 'angular2-swing';

@NgModule({
  declarations: [
    TinderDogPage,
  ],
  imports: [
    IonicPageModule.forChild(TinderDogPage),
    TranslateModule.forChild(),
    SwingModule
  ],
})
export class TinderDogPageModule {}
