import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule} from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { CameraProvider } from '../providers/camera/camera';
import { Camera } from '@ionic-native/camera';
import { PacientesProvider } from '../providers/pacientes/pacientes';
import { MedicosProvider } from '../providers/medicos/medicos';
import { ClinicasProvider } from '../providers/clinicas/clinicas';
import { UserProvider } from '../providers/user/user';
import { IonicStorageModule } from '@ionic/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDFlwbpaAVqR26fa2IlvGUQUf8UwXoV1eY",
  authDomain: "clinicasapp-a19ef.firebaseapp.com",
  projectId: "clinicasapp-a19ef",
  storageBucket: "clinicasapp-a19ef.appspot.com",
  messagingSenderId: "51525135982",
  appId: "1:51525135982:web:faac3a6ad527fa062b007f",
  measurementId: "G-BCK09XX1XH",
  databaseURL:"https://clinicasapp-a19ef-default-rtdb.firebaseio.com/",
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    CameraProvider,
    Camera,
    PacientesProvider,
    MedicosProvider,
    ClinicasProvider,
    UserProvider,
  ]
})
export class AppModule {}
