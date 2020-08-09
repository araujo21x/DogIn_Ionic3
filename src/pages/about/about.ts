import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  public expand: Boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public goToTerms(): void{
    this.navCtrl.push('TermsAboutPage');
  }

  public goToContact(): void{
    this.navCtrl.push('ContactPage');
  }

  
  public whoWeAre(activeText: Boolean): void{
    this.expand = activeText;
  }


}
