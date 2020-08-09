export class Dog {
    status: Boolean;
    uid: String;
    uidUser: String;
    name: String;
    birthDay: Date;
    sex: String;
    breed: String;
    fur: String;
    furType: String;
    temperament: String;
    weight  ?: Number;
    eyeColor ?: String;
    pedigree ?: Boolean;
    dressage ?: Boolean;
    typeDressage ?: String;
    abnormality ?: String;
    otherFeatureght ?: String;
    worming ?: String;
    wormingFrequency ?: String;
    vaccination ?: String;
    medicalObs ?: String;
    lastHeat ?: Date;
    heatFrequency ?: String;
    heatDuration ?: String;
    imgDogProfile ?:String;
    albumPictures?:Array<String>;
    statusHeat?: Boolean;
}