import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class PacientesProvider {

  constructor( public afd:AngularFireDatabase) {
    console.log('Hello PacientesProvider Provider');
  }
  cadastrarPaciente(pacientes){
    return this.afd.list('/Pacientes/').push(pacientes);
  }
  listarPaciente(){
   // return this.afd.list('/Pacientes/').valueChanges() método simples
    return this.afd.list('/Pacientes/').snapshotChanges()
    .map(item=>item.map(changes =>({key:changes.payload.key, value:changes.payload.val() })));
  }
  deletePaciente(ID){
    return this.afd.object('/Pacientes/'+ID).remove();
  }
  atualizarPaciente(ID, pacientes){
    return this.afd.object('/Pacientes/'+ID).update(pacientes);
  }
}
