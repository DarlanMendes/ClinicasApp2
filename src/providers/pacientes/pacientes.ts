import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable()
export class PacientesProvider {

  constructor( public afd:AngularFireDatabase,public afs:AngularFirestore) {
    console.log('Hello PacientesProvider Provider');
  }

  //cadastro de paciente
  // cadastrarPaciente(pacientes){
  //   return this.afd.list('/Pacientes/').push(pacientes);
  // }

  cadastrarPacienteFS(pacientes){
    pacientes.id = this.afs.createId();
    return this.afs.doc('/Pacientes/'+pacientes.id).set(pacientes);
  }

  //---------------Listar Pacientes--------------------------------------------------
  // listarPaciente(){
  //  // return this.afd.list('/Pacientes/').valueChanges() método simples
  //   return this.afd.list('/Pacientes/').snapshotChanges()
  //   .map(item=>item.map(changes =>({key:changes.payload.key, value:changes.payload.val() })));
  // }
  listarPacienteFS(){
    // return this.afd.list('/Pacientes/').valueChanges() método simples
     return this.afs.collection('/Pacientes/' ).snapshotChanges()
     .map(item=>item.map(changes =>({key:changes.payload.doc.id, value:changes.payload.doc.data() })));
   }



//----------------remover paciente------------------------
  // deletePaciente(ID){
  //   return this.afd.object('/Pacientes/'+ID).remove();
  // }
  deletePacienteFS(ID){
    return this.afs.doc('/Pacientes/'+ID).delete();
  }

  //----------------atualizar------------------------
  // atualizarPaciente(ID, pacientes){
  //   return this.afd.object('/Pacientes/'+ID).update(pacientes);
  // }

  atualizarPacienteFS(ID, pacientes){
    return this.afs.doc('/Pacientes/'+ID).update(pacientes);
  }
}
