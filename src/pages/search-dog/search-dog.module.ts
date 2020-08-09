import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchDogPage } from './search-dog';
import { PipesModule } from '../../pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SearchDogPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchDogPage),
    PipesModule,
    TranslateModule.forChild()
  ],
})
export class SearchDogPageModule {}
