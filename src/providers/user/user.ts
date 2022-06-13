import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public afa:AngularFireAuth) {
   
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
