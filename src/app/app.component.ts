import { SettingsProvider } from './../providers/settings/settings';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events, App, MenuController, ActionSheetController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { UserServiceProvider } from '../providers/user-service/user-service';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ParamsForSearch } from '../models/ParamsForSearch';
import { TransformService } from '../providers/util/transform';
import { DogServiceProvider } from '../providers/dog-service/dog-service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { timer } from 'rxjs/observable/timer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage:any = "LoginPage";
  pages: Array<{ title: string, component: any, active: boolean, icon: string, canAccess: boolean}>;
  user:any={roles:{}};
  profileImage: string;
  numberOfDogs: number;
  paramsForSearch: ParamsForSearch = {};
  selectedTheme: String;
  paramsSearchForm: FormGroup;
  public answer :Boolean = null;
  showSplash = true;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public events: Events,
    public app: App,
    public menuController: MenuController,
    public formBuilder: FormBuilder,
    public loginService: LoginServiceProvider,
    public userService: UserServiceProvider,
    public translateService: TranslateService,
    public storage: AngularFireStorage,
    public transformService:TransformService,
    public dogService: DogServiceProvider,
    public socialSharing:SocialSharing,
    public settingsService: SettingsProvider
  )
  {
    this.settingsService.getActiveTheme().subscribe(val => {
      this.user.theme = val
    })
    this.initializeApp();
    this.listen();
    this.loadMenu();
    this.loadForm();
  }
  
  public initializeApp() {
    
    this.platform.ready().then(() => {
    this.statusBar.styleDefault();
    this.splashScreen.hide();
    this.translateService.setDefaultLang('pt');
    this.translateService.use('pt');
    this.menuController.enable(false,'menu-right')
    timer(3000).subscribe(() => this.showSplash = false)
    });
    
  }

  public loadForm(): void{
    this.paramsSearchForm = this.formBuilder.group({
      name: [""],
      min_age: [""],
      max_age: [""],
      min_weight: [""],
      max_weight: [""],
      breed: [""],
      pedigree: false,
      sex: [""],
      temperament: [""],
      dressage: false,
      fur: [""],
      furType: [""],
      worming: false,
      vaccination: [""],
      statusHeat: false
    });
  }

  private listen() {

    this.events.subscribe('active:menu', () => {
      this.menuController.enable(true, 'menu-left');
    });

    this.events.subscribe('disable:menu', () => {
      this.menuController.enable(false, 'menu-left');
    });

    this.userService.getLoggedUser()
      .subscribe(userLogged => {
        if(userLogged) {
          this.user = userLogged;
          if(this.user.theme) {
            this.settingsService.setActiveTheme(this.user.theme);
          }
          this.dogService.getUserDogs(userLogged.uid)
            .subscribe((dogs) => {
              this.numberOfDogs = dogs.length;
              this.loadMenu();
            })
          
          this.storage.ref(`profile_images/${this.user.uid}.jpeg`)
            .getDownloadURL()
            .toPromise()
            .then((el) => {
              this.profileImage = el;
            })
            .catch((err) => {
              console.log('err: ',err);
            })
            
        }
      })
  }

  private loadMenu() {
    this.pages = [
      { title:'side-menu.home', component:'HomePage', active: true, icon:'home', canAccess:true },
      { title:'side-menu.mydogs', component:'ListDogsPage', active: true, icon:'paw', canAccess:true },
      { title:'side-menu.searchdogs', component:'SearchDogPage', active: true, icon:'search', canAccess:true },
      { title:'side-menu.user-settings', component:'EditUserPage', active: true, icon:'settings', canAccess:true },
      //{ title:'side-menu.tinderdog', component:'TinderDogPage', active: true, icon:'search', canAccess:true },
      { title:'side-menu.contactus', component:'ContactPage', active: true, icon:'chatbubbles', canAccess:true },
      { title :"Compartilhar APP", component:'shareApp', active: true, icon:'share',canAccess:true },
      { title:'Guia do App', component:'AppGuidePage',active: true, icon:'help-circle', canAccess:true },
      { title:'side-menu.about', component:'AboutPage', active: true, icon:'information-circle', canAccess:true }
    ]
  }

  public selectFilters() {
    this.menuController.close();
    this.nav.setRoot("SearchDogPage", 
    { 
      params: TransformService.createParamsForSearch(this.paramsForSearch)
    });
  }

  public clear() {

    this.paramsForSearch = { };
    this.resetForm(this.paramsSearchForm);
    this.menuController.close();
    this.nav.setRoot("SearchDogPage", { params: null });
  }

  public openPage(page):void { 
    if(page.component == 'shareApp'){
      this.sharingApp();
    }else{
      this.nav.setRoot(page.component) 
    }
  }

  public openItem(item):void{ this.nav.setRoot(item.page) }

  public logout(){
    this.loginService.logout()
      .then(() => {
        this.events.publish('disable:menu');
        this.app.getRootNav().setRoot('LoginPage');
      })
      .catch((err:any) => console.log('logout err: ',err))
  }

  
  public sharingApp(): void{
    const mensage = "Se junte a familia DogIn fazendo o download do nosso app no site: https://dogindownload.wordpress.com/";
    this.socialSharing.share(mensage)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  private resetForm(formGroup: FormGroup) {
    let control: AbstractControl = null;
    formGroup.reset();
    this.answer = null;
    formGroup.markAsUntouched();
    Object.keys(formGroup.controls).forEach((name) => {
      control = formGroup.controls[name];
      control.setErrors(null);
    });
  }

  public expandeAgeOrWeight(answer): void{
    this.answer = answer;
  }
  
}

