import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ClinicasProvider } from '../../providers/clinicas/clinicas';
import { ExportProvider } from '../../providers/export/export';


declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement : ElementRef;
  map;
  cl=[];
  clinic=[];
  constructor(public navCtrl: NavController,public clinicasProvider:ClinicasProvider, public exportProvider:ExportProvider) {
    
  }

  ionViewDidLoad(){
    this.map = this.createMap(this.mapElement);

    
    this.recebeLocalMap();
  }
    recebeLocalMap(){
    this.clinicasProvider.listarClinicaFS().subscribe((clinica)=>{
      this.clinic= clinica;
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



  // Geração de documentos
  gerarPDF(){
    this.exportProvider.gerarPDF(this.exportarDados(), 'clinicas');
  }
  gerarCSV(){
    this.exportProvider.gerarCSV(this.exportarDados(),'clinicas');
  }
  gerarExcel(){
   
    this.exportProvider.gerarExcel(this.exportarDados(),'clinicas');
  }



  private exportarDados(){
    const jsonArr = [];
    for (let i=0; i<this.clinic.length; i++){
      const element = this.clinic[i];
      //const key = element.key;
      const value = element.value;
      
      let _item={
        'UF': value.UF,
        'cidade': value.cidade,
        'endereço': value.endereco,
        'latitude': value.lat,
        'longitude': value.lng,
        'nome': value.nome
      };
      jsonArr.push(_item);
     
    }
    return jsonArr;
  }
}
