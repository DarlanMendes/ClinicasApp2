import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MedicosProvider } from '../../providers/medicos/medicos';
import { AlertController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-medicos-form',
  templateUrl: 'medicos-form.html',
})
export class MedicosFormPage {
  titulo='';
  medicoID = undefined;
  medicos = { nome: '', crm: '', telefone: '', especialidades: '', status: '' };
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public medicosProvider: MedicosProvider,
    public alertCtrl: AlertController,
  ) {
    const medicoID = this.navParams.get('medicoID');
    const medicos = this.navParams.get('medicos');
    if (medicoID) {
      this.medicoID = medicoID;
      this.medicos = medicos;
      this.titulo="Editar dados médico"
    }else{ this.titulo="Cadastrar médico"}
    console.log(this.medicos);
  }



  

  
  Salvar() {
    if (this.medicoID) {
      this.medicosProvider.atualizarMedico(this.medicoID, this.medicos).then(_database => {
        const mensagem = 'Usuario atualizado com sucesso';
        this.showAlert(mensagem);
      })

    } else {
      this.medicosProvider.cadastrarMedico(this.medicos).then(_database => {
        const mensagem = 'Usuario cadastrado com sucesso'
        this.showAlert(mensagem);
      })
    }
  }

  deletarMedico() {
    {
      const confirm = this.alertCtrl.create({
        title: 'Excluir médico?',
        message: 'Você tem certeza que deseja excluir esse médico?',
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
              if(this.medicoID){
              this.medicosProvider.deleteMedico(this.medicoID).then(data => {
                const mensagem = 'Médico excluído com sucesso';
                this.showAlert(mensagem);
                console.log(this.medicoID);
                
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
      title: 'Médico',
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.pop();
  }

}





