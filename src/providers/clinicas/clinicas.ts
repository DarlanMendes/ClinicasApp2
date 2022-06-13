import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
/*
  Generated class for the ClinicasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClinicasProvider {

  constructor( public afd:AngularFireDatabase) {
    console.log('Hello ClinicasProvider Provider');
  }
  cadastrarClinica(clinicas){
    return this.afd.list('/Clinicas/').push(clinicas);
  }
  listarClinica(){
   // return this.afd.list('/Clinicas/').valueChanges() método simples
    return this.afd.list('/Clinicas/').snapshotChanges()
    .map(item=>item.map(changes =>({key:changes.payload.key, value:changes.payload.val() })));
  }
  deleteClinica(ID){
    return this.afd.object('/Clinicas/'+ID).remove();
  }
  atualizarClinica(ID, clinicas){
    return this.afd.object('/Clinicas/'+ID).update(clinicas);
  }
}
