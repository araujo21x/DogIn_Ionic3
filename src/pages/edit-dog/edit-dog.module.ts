import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditDogPage } from './edit-dog';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    EditDogPage,
  ],
  imports: [
    IonicPageModule.forChild(EditDogPage),
    TranslateModule.forChild()
  ],
})
export class EditDogPageModule {}
