import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email;
  senha;
  constructor(public navCtrl: NavController, public navParams: NavParams,public usuarioProvider:UserProvider, public alertCtrl:AlertController, public storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  abrirCadastrar(){
    this.navCtrl.push('CadastrarUsuarioPage');
  }
  abrirRecuperacao(){
    this.navCtrl.push('RecuperarUsuarioPage');
  }
  FazerLogin(){
    const email=this.email;
    const senha= this.senha;
    this.usuarioProvider.Login(email,senha).then(usuario=>{
      console.log(usuario);
      this.storage.set('usuario',usuario.uid).then(sucesso=>{
      console.log(sucesso)
      const mensagem='Usuário logado com sucesso';
      this.navCtrl.setRoot(HomePage);
      this.showAlert(mensagem);
      })
      
    }).catch(error=>{
      console.log(error);
      const mensagem='Ocorreu um erro durante login';
      this.showAlert(mensagem);
    });
  }
    showAlert(mensagem){
      const alert = this.alertCtrl.create({
        title: mensagem,
        buttons: ['OK']
      });
      alert.present();
    }
  }
