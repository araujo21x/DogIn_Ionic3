import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { FIREBASE_CONFIG } from './app.firebase';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Camera } from '@ionic-native/camera';

import { UserServiceProvider } from '../providers/user-service/user-service';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { DogServiceProvider } from '../providers/dog-service/dog-service';

import { Loading } from '../providers/util/loading';
import { Toast } from '../providers/util/toast';
import { SwingModule } from 'angular2-swing';

import { DirectivesModule } from '../directives/directives.module';
import { ComponentsModule } from '../components/components.module';
import { TransformService } from '../providers/util/transform';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SettingsProvider } from '../providers/settings/settings';
import { LikeServiceProvider } from '../providers/like-service/like-service';
import { ContactServiceProvider } from '../providers/contact-service/contact-service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [MyApp],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    DirectivesModule,
    ComponentsModule,
    SwingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    LoginServiceProvider,
    DogServiceProvider,
    TransformService,
    Toast,
    Loading,
    Camera,
    SocialSharing,
    SettingsProvider,
    LikeServiceProvider,
    LikeServiceProvider,
    ContactServiceProvider
  ]
})
export class AppModule {}
