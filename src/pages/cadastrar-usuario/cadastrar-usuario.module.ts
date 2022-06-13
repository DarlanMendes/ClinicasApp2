import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastrarUsuarioPage } from './cadastrar-usuario';

@NgModule({
  declarations: [
    CadastrarUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastrarUsuarioPage),
  ],
})
export class CadastrarUsuarioPageModule {}
