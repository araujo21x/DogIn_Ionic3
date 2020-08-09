import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterUserPage } from './register-user';
import { DirectivesModule } from '../../directives/directives.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    RegisterUserPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterUserPage),
    DirectivesModule,
    TranslateModule.forChild()
    
  ],
})
export class RegisterUserPageModule {}
