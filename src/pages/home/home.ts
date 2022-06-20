import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ClinicasProvider } from '../../providers/clinicas/clinicas';


declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement : ElementRef;
  map;
  cl=[]
  constructor(public navCtrl: NavController,public clinicasProvider:ClinicasProvider) {
    
  }

  ionViewDidLoad(){
    this.map = this.createMap(this.mapElement);

    
    this.recebeLocalMap();
  }
    recebeLocalMap(){
    this.clinicasProvider.listarClinicaFS().subscribe((clinica)=>{
       for(var i=0;i<clinica.length; i++){
        
        let localClinica=
        {
        _lat : (eval(clinica[i].value.lat)),
        _lng : (eval(clinica[i].value.lng)),
        nome: clinica[i].value.nome
        }
        this.setMapClinica(localClinica);
       }   
    });
    
    
  }
  setMapClinica(localClinica){
    const marker = this.addMarker(localClinica._lat,localClinica._lng, localClinica.nome);
    marker.setMap(this.map);
  }


  createMap(mapElement){
    if(mapElement !==null && mapElement.nativeElement !== null&&google){
      let options= {
        zoom:11.5,
        center:{
          lat:-3.769567441519616,  lng:-38.52638474208777
        }
      }
      return new google.maps.Map(mapElement.nativeElement, options);
    }
    return undefined;
  }


  addMarker(_lat,_lng,abrev){
    console.log(_lat,_lng, abrev);
    return new google.maps.Marker({
      position:{lat:_lat, lng:_lng},
      icon: new google.maps.MarkerImage('https://mt.google.com/vt/icon?psize=16&font=fonts/Roboto-Regular.ttf&color=ff330000&name=icons/spotlight/spotlight-waypoint-b.png&ax=44&ay=48&scale=1&text='+abrev)
    })
    
  }

}
