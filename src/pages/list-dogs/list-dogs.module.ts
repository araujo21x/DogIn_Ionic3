import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListDogsPage } from './list-dogs';
import { PipesModule } from '../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ListDogsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListDogsPage),
    PipesModule,
    TranslateModule.forChild()
  ],
})
export class ListDogsPageModule {}
