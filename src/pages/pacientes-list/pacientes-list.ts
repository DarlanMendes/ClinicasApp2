import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PacientesProvider } from '../../providers/pacientes/pacientes';

/**
 * Generated class for the PacientesListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pacientes-list',
  templateUrl: 'pacientes-list.html',
})
export class PacientesListPage {
  pacientes=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public pacientesProvider:PacientesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PacientesListPage');
    this.listarPaciente();
  }
  cadastroPaciente(){
    this.navCtrl.push('PacientesFormPage');
  }
  listarPaciente(){
    this.pacientesProvider.listarPaciente().subscribe(_database=>{
      this.pacientes=_database;
    }),console.error();
    (error=>{
      console.log(error);
    })
  }
  editPaciente(item){
    const pacientes = item.value;
    const pacienteID = item.key;
    this.navCtrl.push('PacientesFormPage',{pacienteID:pacienteID, pacientes:pacientes})
  }

}
