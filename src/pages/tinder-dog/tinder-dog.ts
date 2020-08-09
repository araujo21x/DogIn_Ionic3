import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DogServiceProvider } from '../../providers/dog-service/dog-service';
import {
  StackConfig,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent
} from 'angular2-swing';

@IonicPage()
@Component({
  selector: 'page-tinder-dog',
  templateUrl: 'tinder-dog.html',
})
export class TinderDogPage {

  @ViewChild('mySwingStack') swingStack: SwingStackComponent;
  @ViewChildren('mySwingCard') swingCards: QueryList<SwingCardComponent>;

  listDogs: Array<any> = [];
  stackConfig: StackConfig;
  recentCard: string = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public dogService: DogServiceProvider
  ) 
  {
    this.stackConfig = {
      throwOutConfidence: (offset, element: any) => {
        return Math.min(Math.abs(offset) / (element.offsetWidth / 2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
  }

  ngAfterViewInit() {
    // Either subscribe in controller or set in HTML
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });
    this.addNewCards(1);
  }

  // Called whenever we drag an element
  onItemMove(element, x, y, r) {
    let color = '';
    const abs = Math.abs(x);
    const min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
    const hexCode = this.decimalToHex(min, 2);

    if (x > 0) {
      color = '#' + hexCode + 'FF' + hexCode;
    } else {
      color = '#FF' + hexCode + hexCode;
    }

    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

  // Connected through HTML
  voteUp(like: boolean) {
    const removedCard = this.listDogs.pop();
    this.addNewCards(1);
    if (like) {
      // message to liked this.toastCtrl.create('You liked: ' + removedCard.email);
    } else {
      // message to desliked this.toastCtrl.create('You disliked: ' + removedCard.email);
    }
  }

  // Add new cards to our array
  addNewCards(count: number) {
    this.dogService.loadAllDogs()
      .subscribe( el => {
        el.map(item => {
          console.log('item: ',item)
          this.listDogs.push(item)
        })
      })
  }

  // http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  decimalToHex(d, padding) {
    let hex = Number(d).toString(16);
    const numPadding = typeof (padding) === 'undefined' || padding === null ? 2 : padding;

    while (hex.length < numPadding) {
      hex = '0' + hex;
    }

    return hex;
  }

}
