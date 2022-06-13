import { Injectable } from '@angular/core';
import {Camera,CameraOptions} from '@ionic-native/camera';

/*
  Generated class for the CameraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CameraProvider {

  constructor(public camera:Camera) {
    console.log('Hello CameraProvider Provider');
  }
  FazerFoto(){
    
   
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation:true
    }

  
   return this.camera.getPicture(options);

   
  }
}
