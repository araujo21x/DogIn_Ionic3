import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecoverPasswordPage } from './recover-password';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RecoverPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(RecoverPasswordPage),
    TranslateModule.forChild()
  ],
})
export class RecoverPasswordPageModule {}
