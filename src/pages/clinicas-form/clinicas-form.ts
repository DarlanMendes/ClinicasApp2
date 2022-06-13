import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClinicasProvider } from '../../providers/clinicas/clinicas';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the ClinicasFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clinicas-form',
  templateUrl: 'clinicas-form.html',
})
export class ClinicasFormPage {

  titulo = '';
  clinicaID = undefined;
  clinicas = { nome: '', endereco: '', cidade: '', UF: '' };
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public clinicasProvider: ClinicasProvider,
    public alertCtrl: AlertController,
  ) {
    const clinicaID = this.navParams.get('clinicaID');
    const clinicas = this.navParams.get('clinicas');
    if (clinicaID) {
      this.clinicaID = clinicaID;
      this.clinicas = clinicas;
      this.titulo = "Editar dados clinica"
    } else { this.titulo = "Cadastrar clinica" }
    console.log(this.clinicas);
  }



  ionnViewDidLoad() {

  }


  Salvar() {
    if (this.clinicaID) {
      this.clinicasProvider.atualizarClinica(this.clinicaID, this.clinicas).then(_database => {
        const mensagem = 'Usuario atualizado com sucesso';
        this.showAlert(mensagem);
      })

    } else {
      this.clinicasProvider.cadastrarClinica(this.clinicas).then(_database => {
        const mensagem = 'Usuario cadastrado com sucesso'
        this.showAlert(mensagem);
      })
    }
  }

  deletarclinica() {
    {
      const confirm = this.alertCtrl.create({
        title: 'Excluir clinica?',
        message: 'Você tem certeza que deseja excluir esse clinica?',
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
              if (this.clinicaID) {
                this.clinicasProvider.deleteClinica(this.clinicaID).then(data => {
                  const mensagem = 'clinica excluído com sucesso';
                  this.showAlert(mensagem);
                  console.log(this.clinicaID);

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
      title: 'Clinica',
      subTitle: mensagem,
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.pop();
  }

}


