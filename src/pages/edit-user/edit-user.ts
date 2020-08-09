import { Component, Input } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController
} from "ionic-angular";
import { Loading } from "../../providers/util/loading";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Camera } from "@ionic-native/camera";
import { DomSanitizer } from "@angular/platform-browser";
import { AngularFireStorage } from "@angular/fire/storage";
import { Toast } from "../../providers/util/toast";
import { SettingsProvider } from "./../../providers/settings/settings";

@IonicPage()
@Component({
  selector: "page-edit-user",
  templateUrl: "edit-user.html"
})
export class EditUserPage {
  selectedTheme: String;

  user: any = {};
  profileImage: any;
  basicForm: FormGroup;

  @Input("progress") progress;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserServiceProvider,
    public loading: Loading,
    public formBuilder: FormBuilder,
    public camera: Camera,
    public domSanitizer: DomSanitizer,
    public actionSheet: ActionSheetController,
    public storage: AngularFireStorage,
    public toast: Toast,
    private settings: SettingsProvider
  ) {
    this.loading.show();

    this.userService.getLoggedUser().subscribe(
      user => {
        if (user) {
          this.user = user;
          this.settings.getActiveTheme().subscribe(val => {
            this.user.theme = val;
            this.userService.changeTheme(this.user).then();
          });

          this.storage
            .ref(`profile_images/${this.user.uid}.jpeg`)
            .getDownloadURL()
            .toPromise()
            .then(el => {
              this.profileImage = el;
            })
            .catch(err => {
              console.log("err: ", err);
            });
          this.loading.hide();
        }
      },
      err => {
        this.loading.hide();
      }
    );

    this.basicForm = this.formBuilder.group({
      sex: ["", [Validators.required]],
      name: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      birthDate: ["", [Validators.required]]
    });
  }

  public onSubmitForm() {
    this.loading.show();
    this.userService
      .update(this.user)
      .then(() => {
        this.loading.hide();
        this.toast.show("Alterado com sucesso");
      })
      .catch(err => {
        this.loading.hide();
      });
  }

  public openActionSheet() {
    let actionSheet = this.actionSheet.create({
      title: "Selecione de onde vem a imagem",
      cssClass: "action-sheets-basic-page",
      buttons: [
        {
          text: "Abrir Câmera",
          role: "destructive",
          icon: "home",
          handler: () => {
            this.openCamera(false);
          }
        },
        {
          text: "Abrir Album",
          role: "destructive",
          icon: "home",
          handler: () => {
            this.openCamera(true);
          }
        }
      ]
    });
    actionSheet.present();
  }

  private async openCamera(useAlbum: boolean) {
    let cameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      ...(useAlbum
        ? { sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM }
        : {})
    };
    try {
      const imageData = await this.camera.getPicture(cameraOptions);

      if (imageData) {
        this.profileImage = `data:image/jpeg;base64,${imageData}`;

        const filePath = `profile_images/${this.user.uid}.jpeg`;

        let task = this.storage
          .ref(filePath)
          .putString(this.profileImage, "data_url");

        this.progress = task.percentageChanges();
      }
    } catch (error) {
      console.log("err: ", error);
    }
  }
  pinkAppTheme() {
    this.settings.setActiveTheme("pink-theme");
  }

  blueAppTheme() {
    this.settings.setActiveTheme("blue-theme");
  }
  darkAppTheme() {
    this.settings.setActiveTheme("dark-theme");
  }
}
