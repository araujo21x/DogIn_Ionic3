import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";
import { LikeServiceProvider } from "../../providers/like-service/like-service";
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { DogServiceProvider } from "../../providers/dog-service/dog-service";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { Loading } from "../../providers/util/loading";

@IonicPage()
@Component({
  selector: "page-modal-invite-like",
  templateUrl: "modal-invite-like.html"
})
export class ModalInviteLikePage {
  dog: any;
  dogs: any = [];
  dogToLiked:any;
  userLogged:any;
  message: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewctrl: ViewController,
    public likeService: LikeServiceProvider,
    public dogService: DogServiceProvider,
    public userService: UserServiceProvider,
    public loadingService: Loading
  ) {
    this.dog = this.navParams.get("dogToLiked");
  }


  public dismiss(): void {
    this.viewctrl.dismiss();
  }

  public getDogsByOwner(event: { component: SelectSearchableComponent, text: string  }) {
    
  }

  public sendLike() {
    const like = {
      dateSend: new Date(),
      message: this.message,
      status: "away",
      uidDog: this.dog,
      uidReiceve: this.dog.uidUser
    };

    this.likeService
      .like(like)
      .then(result => {
        console.log("resultado: ", result);
        this.dismiss();
      })
      .catch(err => {
        console.log("error : ", err);
      });
  }



}
