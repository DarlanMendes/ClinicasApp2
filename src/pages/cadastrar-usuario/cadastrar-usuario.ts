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
  usuarios={email:'', senha:'', nomeUsuario:'', id:''}
  constructor(public navCtrl: NavController, public navParams: NavParams, public usuarioProvider:UserProvider,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
   
  }
  cadastrar(){
    const email = this.usuarios.email;
    const senha = this.usuarios.senha;
    const nomeUsuario = this.usuarios.nomeUsuario;
    const id = this.usuarios.id;
    this.usuarioProvider.CadastrarUsuario(email,senha).
    then(usuario=>{
      console.log(usuario);
      const mensagem='Usuário cadastrado com sucesso';
      
      this.navCtrl.pop();
      this.showAlert(mensagem);
      this.SalvarUsuario(usuario.uid,this.usuarios);
      
    }).catch(error=>{
      console.log('error', error);
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
    SalvarUsuario(usuario,usuarios){
      this.usuarioProvider.SalvarUsuario(usuario,usuarios).then(sucesso=>{
        console.log('salvo', sucesso);
      }).catch(erro=>{
        console.log('erro salvar usuario',erro);
      });
    }
  }
  


