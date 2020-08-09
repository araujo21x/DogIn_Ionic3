import { Component,
  ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ActionSheetController,
  AlertController,
  Slides
} from "ionic-angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DogServiceProvider } from "../../providers/dog-service/dog-service";
import { Loading } from "../../providers/util/loading";
import { Toast } from "../../providers/util/toast";
import { Camera } from "@ionic-native/camera";
import { DomSanitizer } from "@angular/platform-browser";
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "@angular/fire/storage";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

@IonicPage()
@Component({
  selector: "page-edit-dog",
  templateUrl: "edit-dog.html"
})
export class EditDogPage {
  //public task: AngularFireUploadTask;

  @ViewChild(Slides) slides: Slides;
  percentage: Observable<number>;

  public dog: any = [];
  public dogFormEdit: FormGroup;
  public dogImageList: any = [];
  public imageUrl: any = [];

  public expandMedic: boolean = false;
  public expandBasic: boolean = false;
  public expandComplement: boolean = false;
  public expandHeat: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dogServiceProvider: DogServiceProvider,
    public formBuilder: FormBuilder,
    public loading: Loading,
    public toast: Toast,
    public camera: Camera,
    public domSanitizer: DomSanitizer,
    public actionSheet: ActionSheetController,
    public afStorage: AngularFireStorage,
    public afStore: AngularFirestore,
    public alertCtrl: AlertController
  ) {
    if (this.navParams.get("dogTransf")) {
      this.dog = this.navParams.get("dogTransf");
    } else {
      this.navCtrl.pop();
    }

    this.doRefresh();

    this.dogFormEdit = formBuilder.group({
      name: ["", [Validators.required]],
      sex: ["", [Validators.required]],
      birthDay: ["", [Validators.required]],
      breed: ["", [Validators.required]],
      fur: ["", [Validators.required]],
      furType: ["", [Validators.required]],
      temperament: ["", [Validators.required]],
      weight: [""],
      eyeColor: [""],
      pedigree: false,
      dressage: false,
      typeDressage: [""],
      abnormality: [""],
      otherFeatureght: [""],
      worming: false,
      wormingFrequency: [""],
      vaccination: [""],
      medicalObs: [""],
      lastHeat: [""],
      heatFrequency: [""],
      heatDuration: [""]
    });
  }

  public doRefresh(): void {
    if (this.dog.albumPictures != null) {
      this.imageUrl = [];
      this.dog.albumPictures.map(index => {
        this.afStorage
          .ref(index)
          .getDownloadURL()
          .toPromise()
          .then(success => {
            this.imageUrl.push(success);
          })
          .catch(error => {
            console.log("erro", JSON.stringify(error));
          });
      });
    }
  }

  public EditDog(awser: boolean): void {
    if(this.dog.weight) {
      this.dog.weight = parseInt(this.dog.weight);
    }
    if(this.dog.sex === "male"){
      this.dog.statusHeat = false;
    }

    this.loading.show();
    this.dogServiceProvider.EditDog(this.dog)
      .then(success => {
        this.loading.hide();

        if (awser) {
          this.toast.show("Alterado com Sucesso");
          this.closePage();
        } else {
          this.toast.showTemperament("Alterado com Sucesso");
        }
      })
      .catch(error => {
        this.toast.show("Erro!");
        this.loading.hide();
      });
  }

  public closePage(): void {
    this.navCtrl.pop();
  }

  public expand(camp: string, awswer: boolean): void {
    switch (camp) {
      case "basic": {
        this.expandBasic = awswer;
        break;
      }
      case "complement": {
        this.expandComplement = awswer;
        break;
      }
      case "medic": {
        this.expandMedic = awswer;
      }
      case "heat": {
        this.expandHeat = awswer;
      }
    }
  }

  public openActionSheet() {
    if (this.dog.albumPictures.length < 5) {
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
    } else {
      let message =
        "Existe um limite de 5 fotos por dog, por favor apague uma foto";
      this.toast.show(message);
    }
  }

  public async openCamera(useAlbum: boolean) {
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
        let dogImage = `data:image/jpeg;base64,${imageData}`;

        let imageUid: string = this.afStore.createId();

        let filePath = `dog_images/${imageUid}.jpeg`;

        let ref = this.afStorage.ref(filePath);

        let task = ref.putString(dogImage, "data_url");

        //this.dogImageList.push(filePath);
        if (this.dog.albumPictures.length > 0) {
          this.dog.albumPictures.push(filePath);
        } else {
          this.dog.albumPictures = [];
          this.dog.albumPictures.push(filePath);
        }

        this.percentage = task.percentageChanges();

        task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              this.percentage = null;
              this.doRefresh();
            })
          )
          .subscribe();

        this.EditDog(false);
      }
    } catch (error) {
      console.log("err: ", error);
    }
  }
  public showDeleteImage(image: any): void {
    let alert = this.alertCtrl.create({
      title: "Apagar Foto!",
      message: "Realmente deseja apagar a foto?",
      buttons: [
        {
          text: "Não",
          role: "Não",
          handler: () => {
            this.toast.show("Cancelado!");
          }
        },
        {
          text: "Sim",
          handler: () => {
            this.deleteImage(image);
            this.toast.show("Apagado com sucesso!");
          }
        }
      ]
    });
    alert.present();
  }

  public deleteImage(image: any): void {
    this.dog.albumPictures.map((filePath, index) => {
      this.afStorage
        .ref(filePath)
        .getDownloadURL()
        .toPromise()
        .then(success => {
          if (success == image) {
            this.afStorage.ref(filePath).delete();
            this.dog.albumPictures.splice(index, 1);
            if(index != 0){
              this.slides.slidePrev();
            }
            this.EditDog(false);
            this.doRefresh();
          }
        });
    });
  }

  selectProfileImg(image: any): void {
    this.dog.imgDogProfile = image;
    this.toast.show("Troca feita, só falta salvar!");
  }
}
