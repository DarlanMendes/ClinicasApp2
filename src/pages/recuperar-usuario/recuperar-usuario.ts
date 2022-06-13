import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the RecuperarUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recuperar-usuario',
  templateUrl: 'recuperar-usuario.html',
})
export class RecuperarUsuarioPage {
  email;
  constructor(public navCtrl: NavController, public navParams: NavParams, public usuarioProvider:UserProvider, public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperarUsuarioPage');
  }
  recuperarSenha(){
    const email=this.email;
    this.usuarioProvider.recuperarSenha(email).then(sucesso=>{
      console.log(sucesso);
      const mensagem='Um email de recuperação foi enviado para sua caixa postal';
      this.navCtrl.pop();
      this.showAlert(mensagem);
    }).catch(error=>{
      console.log(error);
      const mensagem='Ocorreu um erro durante a recuperação';
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
