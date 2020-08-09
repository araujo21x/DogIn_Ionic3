import { NgModule } from '@angular/core';
import { ConfirmPasswordDirective } from './confirm-password/confirm-password';
import { GreaterEighteenDirective } from './greater-eighteen/greater-eighteen';
@NgModule({
	declarations: [ConfirmPasswordDirective,
    GreaterEighteenDirective],
	imports: [],
	exports: [ConfirmPasswordDirective,
    GreaterEighteenDirective]
})
export class DirectivesModule {}
