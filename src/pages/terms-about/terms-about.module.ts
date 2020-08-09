import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TermsAboutPage } from './terms-about';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TermsAboutPage,
  ],
  imports: [
    IonicPageModule.forChild(TermsAboutPage),
    TranslateModule.forChild()
  ],
})
export class TermsAboutPageModule {}
