import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
/*
  Generated class for the ClinicasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClinicasProvider {

  constructor( public afd:AngularFireDatabase, public afs:AngularFirestore) {
    console.log('Hello ClinicasProvider Provider');
  }
  //-----------------------------------cadastrar------------------------
  // cadastrarClinica(clinicas){
  //   return this.afd.list('/Clinicas/').push(clinicas);
  // }
  cadastrarClinicaFS(clinicas){
    clinicas.id = this.afs.createId();
    return this.afs.doc('/Clinicas/'+clinicas.id).set(clinicas);
  }


//------------------Listar Clinicas -------------------------

  // listarClinica(){
  //  // return this.afd.list('/Clinicas/').valueChanges() método simples
  //   return this.afd.list('/Clinicas/').snapshotChanges()
  //   .map(item=>item.map(changes =>({key:changes.payload.key, value:changes.payload.val() })));
  // }
  listarClinicaFS(){
    // return this.afd.list('/Clinicas/').valueChanges() método simples
     return this.afs.collection('/Clinicas/' ).snapshotChanges()
     .map(item=>item.map(changes =>({key:changes.payload.doc.id, value:changes.payload.doc.data() })));
   }



//--------------------Deletar Clinica --------------------------
  // deleteClinica(ID){
  //   return this.afd.object('/Clinicas/'+ID).remove();
  // }
  deleteClinicaFS(ID){
    return this.afs.doc('/Clinicas/'+ID).delete();
  }

//----------------Atualizar clinica-------------------

  // atualizarClinica(ID, clinicas){
  //   return this.afd.object('/Clinicas/'+ID).update(clinicas);
  // }
  atualizarClinicaFS(ID, clinicas){
    return this.afs.doc('/Clinicas/'+ID).update(clinicas);
  }


}
