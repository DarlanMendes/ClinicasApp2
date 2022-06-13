import { Component, ViewChild } from '@angular/core';
import { AlertController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public storage:Storage,public alertCtrl:AlertController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Pacientes', component: 'PacientesListPage'},
      { title: 'Médicos', component: 'MedicosListPage'},
      { title: 'Clinicas', component:'ClinicasListPage'},
      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.get('usuario').then(_usuario=>{
        if(_usuario&&_usuario.length>0){
          this.rootPage = HomePage; }else{
            this.rootPage = 'LoginPage';
          }
      }).catch(error=>{
        this.rootPage = 'LoginPage';
      })
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  Sair(){
    this.storage.remove('usuario').then(sucesso=>
      {
        const mensagem="Usuário deslogado com sucesso";
        this.showAlert(mensagem);
        this.nav.setRoot('LoginPage');
        
        
      }).catch(erro=>{
        const mensagem="Ocorreu um erro ao deslogar";
        this.showAlert(mensagem);
      })
  }
  showAlert(mensagem){
    const alert = this.alertCtrl.create({
      title: mensagem,
      buttons: ['OK']
    });
    alert.present();
  }
}
