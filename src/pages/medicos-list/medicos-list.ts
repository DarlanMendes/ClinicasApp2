import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MedicosProvider } from '../../providers/medicos/medicos';
/**
 * Generated class for the MedicosListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medicos-list',
  templateUrl: 'medicos-list.html',
})
export class MedicosListPage {

  medicos=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public medicosProvider:MedicosProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad medicosListPage');
    this.listarMedico();
  }
  cadastroMedico(){
    this.navCtrl.push('MedicosFormPage');
  }
  listarMedico(){
    this.medicosProvider.listarMedico().subscribe(_database=>{
      this.medicos=_database;
    }),
    (error=>{
      console.log(error);
    })
  }
  editMedico(item){
    const medicos = item.value;
    const medicoID = item.key;
    this.navCtrl.push('MedicosFormPage',{medicoID:medicoID, medicos:medicos})
  }

}

