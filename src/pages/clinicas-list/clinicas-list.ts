import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClinicasProvider } from '../../providers/clinicas/clinicas';
/**
 * Generated class for the ClinicasListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clinicas-list',
  templateUrl: 'clinicas-list.html',
})
export class ClinicasListPage {

  clinicas=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public clinicasProvider:ClinicasProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClinicasListPage');
    this.listarClinica();
  }
  cadastroClinica(){
    this.navCtrl.push('ClinicasFormPage');
  }
  listarClinica(){
    this.clinicasProvider.listarClinica().subscribe(_database=>{
      this.clinicas=_database;
    }),console.error();
    (error=>{
      console.log(error);
    })
  }
  editClinica(item){
    const clinicas = item.value;
    const clinicaID = item.key;
    this.navCtrl.push('ClinicasFormPage',{clinicaID:clinicaID, clinicas:clinicas})
  }

}
