import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditUserPage } from './edit-user';
import { DirectivesModule } from '../../directives/directives.module';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    EditUserPage,
  ],
  imports: [
    IonicPageModule.forChild(EditUserPage),
    DirectivesModule,
    ComponentsModule,
    TranslateModule.forChild()
  ],
})
export class EditUserPageModule {}
