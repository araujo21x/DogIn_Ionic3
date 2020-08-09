import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalInviteLikePage } from './modal-invite-like';
import { TranslateModule } from '@ngx-translate/core';
import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
  declarations: [
    ModalInviteLikePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalInviteLikePage),
    TranslateModule.forChild(),
    SelectSearchableModule
  ],
})
export class ModalInviteLikePageModule {}
