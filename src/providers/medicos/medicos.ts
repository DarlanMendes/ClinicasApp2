import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable()
export class MedicosProvider {

  constructor( public afd:AngularFireDatabase, public afs:AngularFirestore) {
    console.log('Hello MedicosProvider Provider');
  }

  //----------------------------cadastro médico-----------------
  // cadastrarMedico(medicos){
  //   return this.afd.list('/Medicos/').push(medicos);
  // }
  cadastrarMedicoFS(medicos){
    medicos.id= this.afs.createId(); 
    return this.afs.doc('/Medicos/'+medicos.id).set(medicos);
  }

//---------------------lista médicos---------------------
  // listarMedico(){
  //  // return this.afd.list('/Medicos/').valueChanges() método simples
  //   return this.afd.list('/Medicos/').snapshotChanges()
  //   .map(item=>item.map(changes =>({key:changes.payload.key, value:changes.payload.val() })));
  // }
  listarMedicoFS(){
    // return this.afd.list('/Medicos/').valueChanges() método simples
     return this.afs.collection('/Medicos/').snapshotChanges()
     .map(item=>item.map(changes =>({key:changes.payload.doc.id, value:changes.payload.doc.data() })));
   }


  //------------------------deletar médicos--------------

  // deleteMedico(ID){
  //   return this.afd.object('/Medicos/'+ID).remove();
  // }

  deleteMedicoFS(ID){
    return this.afs.doc('/Medicos/'+ID).delete();
  }
//---------------------Atualizar médicos --------------------

  // atualizarMedico(ID, medicos){
  //   return this.afd.object('/Medicos/'+ID).update(medicos);
  // }
  atualizarMedicoFS(ID, medicos){
    return this.afs.doc('/Medicos/'+ID).update(medicos);
  }



}
