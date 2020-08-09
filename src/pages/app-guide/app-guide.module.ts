import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppGuidePage } from './app-guide';

@NgModule({
  declarations: [
    AppGuidePage,
  ],
  imports: [
    IonicPageModule.forChild(AppGuidePage),
  ],
})
export class AppGuidePageModule {}
