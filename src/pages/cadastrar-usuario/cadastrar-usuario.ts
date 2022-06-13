import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cadastrar-usuario',
  templateUrl: 'cadastrar-usuario.html',
})
export class CadastrarUsuarioPage {
  usuarios={email:'', senha:'', nome:''}
  constructor(public navCtrl: NavController, public navParams: NavParams, public usuarioProvider:UserProvider,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
   
  }
  cadastrar(){
    const email = this.usuarios.email;
    const senha = this.usuarios.senha;
    this.usuarioProvider.CadastrarUsuario(email,senha).
    then(sucesso=>{
      console.log(sucesso);
      const mensagem='Usuário cadastrado com sucesso';
      this.navCtrl.pop();
      this.showAlert(mensagem);
    }).catch(error=>{
      console.log(error);
      const mensagem='Ocorreu um erro no cadastro';
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
  


