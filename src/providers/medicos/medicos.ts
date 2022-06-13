import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class MedicosProvider {

  constructor( public afd:AngularFireDatabase) {
    console.log('Hello MedicosProvider Provider');
  }
  cadastrarMedico(medicos){
    return this.afd.list('/Medicos/').push(medicos);
  }
  listarMedico(){
   // return this.afd.list('/Medicos/').valueChanges() método simples
    return this.afd.list('/Medicos/').snapshotChanges()
    .map(item=>item.map(changes =>({key:changes.payload.key, value:changes.payload.val() })));
  }
  deleteMedico(ID){
    return this.afd.object('/Medicos/'+ID).remove();
  }
  atualizarMedico(ID, medicos){
    return this.afd.object('/Medicos/'+ID).update(medicos);
  }
}
