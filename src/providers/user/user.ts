import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public afa:AngularFireAuth, public afs:AngularFirestore, public afd:AngularFireDatabase) {
   
  }
  NomeUsuario(id){
    return this.afd.object('/Usuarios/'+id).valueChanges()  
  }
  
    SalvarUsuario(id,usuarios){
    usuarios.id = id;
    usuarios.senha='';
    console.log(usuarios.id);
    return this.afd.object('/Usuarios/'+usuarios.id).set(usuarios);
  }
  CadastrarUsuario(email,senha){
    return this.afa.auth.createUserWithEmailAndPassword(email,senha);
  }
  Login(email,senha){
    return this.afa.auth.signInWithEmailAndPassword(email,senha);
  }
  recuperarSenha(email){
    return this.afa.auth.sendPasswordResetEmail(email);
  }

}
