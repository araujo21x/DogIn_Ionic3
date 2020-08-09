import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactServiceProvider } from '../../providers/contact-service/contact-service';



@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  public expand: Boolean = false;
  public topic: string;
  public message: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public contactService: ContactServiceProvider) {
  }

  public showLine (trigger: Boolean): void{
    this.expand = trigger;
  }

  public sendMessage(): void{
    this.contactService.saveMessageContactPage(this.message, this.topic);
    this.message = "";
  }

}
