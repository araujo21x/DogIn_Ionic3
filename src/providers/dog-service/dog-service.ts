import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  CollectionReference,
  Query
} from "@angular/fire/firestore";
import { Dog } from "../../models/Dog";
import { ParamsForSearch } from "../../models/ParamsForSearch";

@Injectable()
export class DogServiceProvider {
  public uidDog: string;
  public userLogged: any;
  constructor(private afStore: AngularFirestore) {  }

  public saveDog(dog: any) {
    let DogProfile = "https://firebasestorage.googleapis.com/v0/b/dogin-201904.appspot.com/o/dog_images%2Fdog-perfil.png?alt=media&token=03522481-2764-4a57-a0fb-0f1fc09c7577";
    let uidDog: string = this.afStore.createId();
    let ref = this.afStore.collection("dogs").doc(uidDog);
    let newDog: Dog = {
      status: true,
      imgDogProfile: DogProfile,
      uid: uidDog,
      uidUser: dog.uidUser,
      name: dog.name,
      birthDay: dog.birthDay,
      sex: dog.sex,
      breed: dog.breed,
      fur: dog.fur,
      furType: dog.furType,
      temperament: dog.temperament,
      albumPictures: []
    };
    this.uidDog = uidDog;
    return ref.set(newDog);
  }

  public EditDog(dog: any) {
    let ref = this.afStore.collection("dogs").doc(dog.uid);
    let editDog: Dog = {
      status: dog.status,
      uid: dog.uid,
      uidUser: dog.uidUser,
      name: dog.name,
      birthDay: dog.birthDay,
      sex: dog.sex,
      breed: dog.breed,
      fur: dog.fur,
      furType: dog.furType,
      temperament: dog.temperament,
      weight: dog.weight != null ? dog.weight : null,
      eyeColor: dog.eyeColor != null ? dog.eyeColor : null,
      pedigree: dog.pedigree != null ? dog.pedigree : null,
      dressage: dog.dressage != null ? dog.dressage : null,
      typeDressage: dog.typeDressage != null ? dog.typeDressage : null,
      abnormality: dog.abnormality != null ? dog.abnormality : null,
      otherFeatureght: dog.otherFeatureght != null ? dog.otherFeatureght : null,
      worming: dog.worming != null ? dog.worming : null,
      wormingFrequency: dog.wormingFrequency != null ? dog.wormingFrequency : null,
      vaccination: dog.vaccination != null ? dog.vaccination : null,
      medicalObs: dog.medicalObs != null ? dog.medicalObs : null,
      lastHeat: dog.lastHeat != null ? dog.lastHeat : null,
      heatFrequency: dog.heatFrequency != null ? dog.heatFrequency : null,
      heatDuration: dog.heatDuration != null ? dog.heatDuration : null,
      albumPictures: dog.albumPictures != null ? dog.albumPictures : null,
      imgDogProfile: dog.imgDogProfile != null ? dog.imgDogProfile : null,
      statusHeat: dog.statusHeat != null ? dog.statusHeat : false
    };
    return ref.set(editDog);
  }

  public returnUidDog(): string {
    return this.uidDog;
  }

  public getUserDogs(uid: string) {
    return this.afStore
      .collection("dogs", ref =>
        ref.where("uidUser", "==", uid).where("status", "==", true)
      )
      .valueChanges();
  }

  public loadAllDogs() {
    return this.afStore.collection("dogs").valueChanges();
  }

  public searchDog(params: ParamsForSearch) {
    return new Promise<Dog[]>((resolve, reject) => {
      const reference = this.afStore.collection("dogs").ref;

      Object.keys(params)
      .map(property => {
        if(!params[property]) {
          delete params[property];
        }
      });

      const query = this.createQuery(params, reference);

      query.get().then(querySnapshop => {
        const restulQuery = querySnapshop.docs.map(documents =>
          documents.data()
        ) as Dog[];
        resolve(restulQuery);
      });
    });
  }

  private createQuery(params: ParamsForSearch, query: CollectionReference) {
    let ref: Query = query;
    ref = ref.where("status", "==", true);
    Object.keys(params).map(property => {
      switch (property) {
        case "min_age":
          ref = ref.where("birthDay", "<=", params[property]);
          break;

        case "max_age":
          ref = ref.where("birthDay", ">=", params[property]);
          break;

        case "name":
          ref = ref.where("name", "==", params[property]);
          break;

        case "min_weight":
          ref = ref.where("weight", ">=", params[property]);
          break;

        case "max_weight":
          ref = ref.where("weight", "<=", params[property]);
          break;

        case "breed":
          ref = ref.where("breed", "==", params[property]);
          break;

        case "statusHeat":
          ref = ref.where("statusHeat", "==", params[property]);
          break;

        case "pedigree":
          ref = ref.where("pedigree", "==", params[property]);
          break;

        case "sex":
          ref = ref.where("sex", "==", params[property]);
          break;

        case "temperament":
          ref = ref.where("temperament", "==", params[property]);
          break;

        case "furType":
          ref = ref.where("furType", "==", params[property]);
          break;

        case "min_age":
          ref = ref.where("birthDay", "<", params[property]);
          break;

        case "fur":
          ref = ref.where("fur", "==", params[property]);
          break;

        case "dressage":
          ref = ref.where("dressage", "==", params[property]);
          break;

        case "worming":
          ref = ref.where("worming", "==", params[property]);
          break;

        case "vaccination":
          ref = ref.where("vaccination", "==", params[property]);
          break;

        default:
          ref = ref.where("weight", ">", "0");
          break;
      }
    });
    return ref;
  }
}
