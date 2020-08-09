import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-app-guide',
  templateUrl: 'app-guide.html',
})
export class AppGuidePage {

  public expandHomeScreen: boolean;
  public expandMyDogs: boolean;
  public expandSearchDogs: boolean;
  public expandUserSettings: boolean;
  public expandShareApp: boolean;
  public expandAbout: boolean;
  public expandEditDog: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public expand(camp: string, awswer: boolean): void{
    switch(camp) { 
      case 'homeScreen': { 
        this.expandHomeScreen = awswer;
        break; 
      }
      case 'myDogs': {
        this.expandMyDogs = awswer;
        break;
      }
      case 'editDog':{
        this.expandEditDog = awswer;
        break;
      }
      case 'searchDogs': {
        this.expandSearchDogs = awswer;
        break;
      }
      case 'userSettings': {
        this.expandUserSettings = awswer;
        break;
      }
      case "shareApp": {
        this.expandShareApp = awswer;
        break;
      }
      case "about": {
        this.expandAbout = awswer;
        break;
      }
    }
  }
}
