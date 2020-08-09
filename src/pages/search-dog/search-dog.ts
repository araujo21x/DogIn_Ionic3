import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ParamsForSearch } from '../../models/ParamsForSearch';
import { ListDogsPageModule } from '../list-dogs/list-dogs.module';
import { Dog } from '../../models/Dog';
import { DogServiceProvider } from '../../providers/dog-service/dog-service';
import { TransformService } from '../../providers/util/transform';

@IonicPage()
@Component({
  selector: 'page-search-dog',
  templateUrl: 'search-dog.html',
})
export class SearchDogPage {

  listDogs:Dog[] = [];
  paramsForSearch: ParamsForSearch = {};
  textForParamsSelected:any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public menuController: MenuController,
    public dogService: DogServiceProvider
  ) 
  {
    if(navParams.get('params')) {
      this.paramsForSearch = navParams.get('params');

      Object.keys(this.paramsForSearch)
      .map(property => {
        if(!this.paramsForSearch[property]) {
          delete this.paramsForSearch[property];
        }
      });

      Object.keys(this.paramsForSearch)
        .map(property => {
          
          if(property === 'name'){
            this.textForParamsSelected.push(`Nome pesquisado: ${this.paramsForSearch[property]}`);
          }

          if(property === 'min_age') {
            this.textForParamsSelected.push(`Idade mínima ${TransformService.convertDateToNumber(this.paramsForSearch[property])}`)
          }

          if(property === 'max_age') {
            this.textForParamsSelected.push(`Idade máxima ${TransformService.convertDateToNumber(this.paramsForSearch[property])}`)
          }

          if(property === 'min_weight'){
            this.textForParamsSelected.push(`Peso Minimo ${this.paramsForSearch[property]}`);
          }

          if(property === 'max_weight'){
            this.textForParamsSelected.push(`Peso Maximo ${this.paramsForSearch[property]}` );
          }

          if(property === 'breed'){
            this.textForParamsSelected.push(`Nome da raça: ${this.paramsForSearch[property]}` );
          }

          if(property === 'statusHeat'){
            this.textForParamsSelected.push('Dog no Cio');
          }

          if(property === 'pedigree'){
            this.textForParamsSelected.push(`Dog com Pedigree: ${this.paramsForSearch[property]}` );
          }

          if(property === 'sex'){
            this.textForParamsSelected.push(`Sexo: ${this.paramsForSearch[property]}`);
          }

          if(property === 'temperament'){
            this.textForParamsSelected.push(`Temperamento: ${this.paramsForSearch[property]}`);
          }

          if(property === 'furType'){
            this.textForParamsSelected.push(`Tipo de pelagem: ${this.paramsForSearch[property]}`);
          }

          if(property === 'fur'){
            this.textForParamsSelected.push(`Cor da Pelagem: ${this.paramsForSearch[property]} `);
          }

          if(property === 'dressage'){
            this.textForParamsSelected.push(`Adestrado ${this.paramsForSearch[property]}`);
          }

          if(property === 'worming'){
            this.textForParamsSelected.push(`Dogs vermifugado`);
          }

          if(property === 'vaccination'){
            this.textForParamsSelected.push(`vacinação : ${this.paramsForSearch[property]}`);
          }
          
        })
    } 
  }

  ionViewDidEnter() {
    this.searchDog();
    this.menuController.enable(true,'menu-right');
  }

  ionViewWillLeave() {
    this.menuController.enable(false, 'menu-right');
  }

  private searchDog() {
    this.dogService.searchDog(this.paramsForSearch)
      .then(el => {
        this.listDogs = el;
      })
      
  }

  public selectDog(dog: any): void {
    this.navCtrl.push('DetailDogPage', {dogTransf:dog})
  }
  

}
