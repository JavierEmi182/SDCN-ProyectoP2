/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente';
import { Mascota } from 'src/app/interfaces/mascota';
import { Paseador } from 'src/app/interfaces/paseador';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { PaseadorService } from 'src/app/servicios/paseador.service';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { MascotaData } from 'src/app/interfaces/mascota-data';
import { ArealocationService } from 'src/app/servicios/arealocation.service';
import { Area } from 'src/app/interfaces/area';
import { Localizacion } from 'src/app/interfaces/localizacion';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { Servicio } from 'src/app/interfaces/servicio';
import { FranjaService } from 'src/app/servicios/franja.service';
import { FranjaHoraria } from 'src/app/interfaces/franja-horaria';
import { PaseoService } from 'src/app/servicios/paseo.service';
import { Paseo } from 'src/app/interfaces/paseo';
@Component({
  selector: 'app-manageboard',
  templateUrl: './manageboard.component.html',
  styleUrls: ['./manageboard.component.css']
})
export class ManageboardComponent {
  selected = 'option1';
  displayedColumns!: string[];
  listamostrar: any[] = [];
  listalista!: any;
  paseadores: Paseador[] = [];
  areas: Area[] = [];
  locations: Localizacion[] = [];
  mascotas: MascotaData[] = [];
  mascotas1: Mascota[] = [];
  mascotalista!: MascotaData;
  clientes: Cliente[] = [];
  servicioList: Servicio[] = [];
  franjas: FranjaHoraria[] = [];
  paseador = false;
  cliente = false;
  mascota = false;
  servicios = false;
  serviciosclick = false;
  selectedServiciosVer = "option1";
  constructor(private ps:PaseoService,private franjaH:FranjaService,private servicioService:ServicioService,private aloc:ArealocationService,private cliService:ClienteService, mascotaService:MascotaService, paseadorService: PaseadorService ){
    cliService.getClientes().subscribe(respuesta => {
      this.clientes = respuesta as Cliente[];
    })

    mascotaService.getMascotas().subscribe(respuesta1 =>{
      this.mascotas1 = respuesta1 as Mascota[];
    })

    aloc.getAreas().subscribe(respuesta =>{
      this.areas = respuesta as Area[];
    })

    aloc.getLocations().subscribe(respuesta =>{
      this.locations = respuesta as Localizacion[];
    })

    mascotaService.getAllMascotasData().subscribe(respuesta1 =>{
      this.mascotas = respuesta1 as MascotaData[];
      this.mascotalista = this.mascotas[0];
    })

    paseadorService.getPaseadores().subscribe(respuesta2 =>{
      this.paseadores = respuesta2 as Paseador[];
      //Como es por default hay que cargar la vista
      this.obtenerDatosVista();
    })

    servicioService.getServicios().subscribe(respuesta2 =>{
      this.servicioList = respuesta2 as Servicio[];
    })

    franjaH.getFranjas().subscribe(respuesta =>{
      this.franjas = respuesta as FranjaHoraria[];
    })




  }



  obtenerDatosVista(){
    if(this.selected == "option1"){
      this.cliente = false;
      this.paseador = true;
      this.mascota = false;
      this.servicios = false;
      this.serviciosclick = false;
      this.listamostrar = this.paseadores;
      this.displayedColumns = ['ID', 'name', 'tel','date','actions'];
    }
    else if (this.selected == "option2"){
      this.cliente = true;
      this.paseador = false;
      this.mascota = false;
      this.servicios = false;
      this.serviciosclick = false;
      this.listamostrar = this.clientes;
      const arr = [];
      let areaname = "";
      let locname = "";
      for(const cliente of this.listamostrar){
        for(const location of this.locations){
          if(location.location_id == cliente.location_id){
            locname = location.location_name
            for(const area of this.areas){
              if(area.area_id == location.area_id){

                areaname = area.area_name

              }
            }
          }
        }

        const dict = {"client_tel":cliente.client_tel,"client_ID":cliente.client_ID,"client_name":cliente.client_name,"start_date":cliente.start_date,"area":areaname,"location":locname}
        arr.push(dict);
      }
      this.listamostrar = arr;
      console.log(this.listamostrar);
      this.displayedColumns = ['name', 'tel', 'area','location','date','actions'];
    }
    else if (this.selected =="option3"){
      this.mascota = true;
      this.cliente = false;
      this.paseador = false;
      this.servicios = false;
      this.serviciosclick = false;
      this.listamostrar = this.mascotas1;
      console.log(this.listamostrar)
      this.displayedColumns = [ 'name', 'breed', 'service','actions'];

    }
    else if(this.selected == "option4"){
      this.mascota = false;
      this.cliente = false;
      this.paseador = false;
      this.servicios = true;
      this.serviciosclick = true;
      this.listamostrar = this.servicioList;
      const arr = [];
      let paseador = "";
      let mascota = "";
      let fH = "";
      let service = "";
      let localidad = "";
      if(this.selectedServiciosVer == "option1"){

        
        for(const servi of this.listamostrar){
          for(const pas of this.paseadores){
            if(servi.walker_ID == pas.walker_ID){
              paseador = pas.walker_name;
            }
          }
          for(const masc of this.mascotas1){
            if(servi.pet_token == masc.pet_token){
              mascota = masc.pet_name;
              service = masc.service;
              for(const cliente of this.clientes){
                if(cliente.client_ID == masc.client_ID){
                  for(const locati of this.locations){
                    if(cliente.location_id == locati.location_id){
                      localidad = locati.location_name;
                    }
                  }
                }
              }
            }
  
          }
  
  
          for(const franj of this.franjas){
            if(servi.franja_id ==  franj.franja_id){
              fH = franj.convertido;
            }
          }
  
  
  
          const dict = {"servicio_ID":servi.servicio_ID,"pet":mascota,"servicio":service,"paseador":paseador,"location":localidad,"time":fH};
          arr.push(dict)
  
  
        }

      }
      else{
        let count = 0
        let arrpase = []
        let paseoactivo = false;
        for(const servi of this.listamostrar){
    

          this.ps.getPaseoServicio(servi.servicio_ID).subscribe(respuesta =>{
            arrpase = respuesta as Paseo[];
            console.log(arrpase);
            count = arrpase.length;
          })


          for(const pas of this.paseadores){
            if(servi.walker_ID == pas.walker_ID){
              paseador = pas.walker_name;
            }
          }
          for(const masc of this.mascotas1){
            if(servi.pet_token == masc.pet_token){
              mascota = masc.pet_name;
              service = masc.service;
              paseoactivo = this.paseoActivo(count,masc.service);
              for(const cliente of this.clientes){
                if(cliente.client_ID == masc.client_ID){
                  for(const locati of this.locations){
                    if(cliente.location_id == locati.location_id){
                      localidad = locati.location_name;
                    }
                  }
                }
              }
            }
  
          }
  
  
          for(const franj of this.franjas){
            if(servi.franja_id ==  franj.franja_id){
              fH = franj.convertido;
            }
          }
  
          
          const dict = {"servicio_ID":servi.servicio_ID,"pet":mascota,"servicio":service,"paseador":paseador,"location":localidad,"time":fH};
          if(paseoactivo){
            arr.push(dict)
          }
  
        }

      }
      this.listamostrar = arr;
      this.displayedColumns = [ 'ID', 'pet','serv', 'walker','loca','time','actions'];
    }
    else{
      this.cliente = false;
      this.paseador = false;
      this.mascota = false;

    }

  }

  paseoActivo(paseosDone:number, servicio:string){
    if(servicio == "5P"){
      if(paseosDone  <= 20){
        return true;
      }
      return false;

    }
    else{
      if(paseosDone <= 12){
        return true;
      }
      return false;
      
    }
  }

}
