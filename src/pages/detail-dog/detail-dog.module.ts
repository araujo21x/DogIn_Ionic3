import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailDogPage } from './detail-dog';
import { PipesModule } from '../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DetailDogPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailDogPage),
    PipesModule,
    TranslateModule.forChild()
  ],
})
export class DetailDogPageModule {}
