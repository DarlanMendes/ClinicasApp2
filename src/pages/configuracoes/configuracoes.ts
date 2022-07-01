import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CameraProvider } from '../../providers/camera/camera';
import { ActionSheetController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { animate } from '@angular/core/src/animation/dsl';
import { Parser } from '@angular/compiler';
@IonicPage()
@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
})
export class ConfiguracoesPage {
  
  usuario = {id:'', nomeUsuario: '', email: '', foto: '../../assets/imgs/avatar.jpg', senha:'' }
 
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public camera: CameraProvider,
    public actionSheetCtrl: ActionSheetController,
    public plt: Platform,
    public user:UserProvider,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {

    this.storage.get('usuarioEmail').then(email => {
      console.log(email);
      this.usuario.email = email;
    });
    this.storage.get('usuarioNome').then(nome => {
      console.log(nome);
      this.usuario.nomeUsuario= nome;
    });
    this.storage.get('usuario').then(usuarioID=>{
    this.user.NomeUsuario(usuarioID).subscribe(usuario=>{
      this.usuario.foto= usuario['foto']
    })})
  }
  EscolherFoto() {

    const actionSheet = this.actionSheetCtrl.create({
      title: 'Selecione uma opção:',
      buttons: [
        {
          text: 'Câmera',
          role: 'camera',
          handler: () => {
            if(this.plt.is('cordova')){
              const fonte=1; // CAMERA: 1;
              this.camera.FazerFoto(fonte).then(imagemData => {
                this.usuario.foto = 'data:image/jpeg;base64,' + imagemData;
              })
            }else{
              alert('Essa plataforma não permite fazer fotos pela câmera.')
            }

          }
        }, {
          text: 'Galeria',
          handler: () => {
            if(this.plt.is('cordova')){
              const fonte=0; // PHOTOLIBRARY: 0;
              this.camera.FazerFoto(fonte).then(imagemData => {
                this.usuario.foto = 'data:image/jpeg;base64,'+ imagemData;
              })
            }else{
              alert('Essa plataforma não permite fazer fotos pela câmera.')
            }
          }
        }, {
          text: 'Cancelar',
          role: 'cancelar',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();

  }

  SalvarPerfil(){
    this.storage.get('usuario').then(usuarioID=>{
      this.usuario.id= usuarioID;
      this.user.SalvarUsuario( usuarioID,this.usuario).then(data=>{
        const mensagem = 'Usuario atualizado com sucesso';
        this.showAlert(mensagem);
      }).catch(data=>{
        const mensagem = 'Erro a salvar alterações';
        this.showAlert(mensagem);
      })
      
    })
    
  }

  showAlert(mensagem) {
    const alert = this.alertCtrl.create({
      title: 'Paciente',
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.setRoot(HomePage);
  }

}





