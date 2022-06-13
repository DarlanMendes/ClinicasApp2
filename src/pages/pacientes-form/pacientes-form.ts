import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraProvider } from '../../providers/camera/camera';
import { PacientesProvider } from '../../providers/pacientes/pacientes';
import { AlertController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-pacientes-form',
  templateUrl: 'pacientes-form.html',
})
export class PacientesFormPage {
  titulo='';
  pacienteID = undefined;
  pacientes = { nome: '', convenio: '', telefone: '', endereco: '', cidade: '', UF: '', foto: 'https://bit.ly/3ttLPrJ' };
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public camera: CameraProvider,
    public pacientesProvider: PacientesProvider,
    public alertCtrl: AlertController,
  ) {
    const pacienteID = this.navParams.get('pacienteID');
    const pacientes = this.navParams.get('pacientes');
    if (pacienteID) {
      this.pacienteID = pacienteID;
      this.pacientes = pacientes;
      this.titulo="Editar dados paciente"
    }else{ this.titulo="Cadastrar paciente"}
    console.log(this.pacientes);
  }



  ionnViewDidLoad(){
    
  }


  TirarFoto() {
    this.camera.FazerFoto().then((imageData) => {
      this.pacientes.foto = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
    });
  }
  Salvar() {
    if (this.pacienteID) {
      this.pacientesProvider.atualizarPaciente(this.pacienteID, this.pacientes).then(_database => {
        const mensagem = 'Usuario atualizado com sucesso';
        this.showAlert(mensagem);
      })

    } else {
      this.pacientesProvider.cadastrarPaciente(this.pacientes).then(_database => {
        const mensagem = 'Usuario cadastrado com sucesso'
        this.showAlert(mensagem);
      })
    }
  }

  deletarPaciente() {
    {
      const confirm = this.alertCtrl.create({
        title: 'Excluir paciente?',
        message: 'Você tem certeza que deseja excluir esse paciente?',
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {
              console.log('Disagree clicked');
            }
          },
          {
            text: 'Sim, desejo!',
            handler: () => {
              if(this.pacienteID){
              this.pacientesProvider.deletePaciente(this.pacienteID).then(data => {
                const mensagem = 'Paciente excluído com sucesso';
                this.showAlert(mensagem);
                console.log(this.pacienteID);
                
              })
            }
            }
          }
        ]
      });
      confirm.present();
     
    }

  }

  showAlert(mensagem) {
    const alert = this.alertCtrl.create({
      title: 'Paciente',
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.pop();
  }

}





