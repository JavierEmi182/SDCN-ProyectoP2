/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import timeGridPlugin from '@fullcalendar/timegrid';
import { Area } from 'src/app/interfaces/area';
import { FranjaHoraria } from 'src/app/interfaces/franja-horaria';
import { Mascota } from 'src/app/interfaces/mascota';
import { Paseador } from 'src/app/interfaces/paseador';
import { Servicio } from 'src/app/interfaces/servicio';
import { ArealocationService } from 'src/app/servicios/arealocation.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { FranjaService } from 'src/app/servicios/franja.service';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { PaseadorService } from 'src/app/servicios/paseador.service';
import { PaseoService } from 'src/app/servicios/paseo.service';
import { ServicioService } from 'src/app/servicios/servicio.service';
import * as moment from 'moment';
import { Localizacion } from 'src/app/interfaces/localizacion';
import { Cliente } from 'src/app/interfaces/cliente';
const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
const endOfMonth   = moment().endOf('month').format('YYYY-MM-DD');
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent {
  listeventos: any[] = [];
  servicios: Servicio[] = [];
  areas: Area[] = [];
  locations: Localizacion[] = [];
  franjas: FranjaHoraria[] = [];
  mascotas: Mascota[] = [];
  clientes: Cliente[] =[];
  selectedArea = "default";
  paseadores: Paseador[] = [];
  calendarOptions!: CalendarOptions;
  constructor(private area:ArealocationService,private fh:FranjaService,private paseo:PaseoService,private route:ActivatedRoute, private serv:ServicioService, private paseadorService:PaseadorService,private mascotaService:MascotaService,private clienteService:ClienteService, private router:Router){
  
    this.cargarFechasCalendar();
  }

  getArea(locationid:number){





    for(const area of this.areas){
      for(const location of this.locations){
        if(locationid == location.location_id){
          return location.area_id;
        }
      }
    }
    return 0;
  }

  cargarFechasCalendar(){
    this.listeventos = [];
    let toadd = false;
    for(const servici of this.servicios){
      let petname = ""
      let hora_ini = "";
      let hora_fin = "";
      let pas = "";
      const hora = servici.franja_id;
      for(const franj of this.franjas){
        if(hora == franj.franja_id){
          const hora_arr = franj.convertido.split("-")
          hora_ini = hora_arr[0] + ":00:00"
          hora_fin =  hora_arr[1] + ":00:00"
        }
      }

      for(const paseador of this.paseadores){
        if(servici.walker_ID == paseador.walker_ID){
          pas= paseador.walker_name;
        }
      }

      for(const pet of this.mascotas){
        if(servici.pet_token == pet.pet_token){
          petname = pet.pet_name;
          for(const cli of this.clientes){
            if(pet.client_ID == cli.client_ID){
              const location = cli.location_id;
              const area_id = this.getArea(location);
              if(area_id == parseInt(this.selectedArea)){
                toadd=true;
              }

            }
          }
        }
      }

      const titulo = "Paseo a " + petname + " por " + pas 
      const event = {
        title: titulo, startRecur:startOfMonth,endRecur:endOfMonth,startTime:hora_ini,endTime:hora_fin
      }
      if(toadd){
        this.listeventos.push(event)
      }

      console.log(this.listeventos)

    }

    this.calendarOptions = {
      initialView: 'timeGridWeek',
      plugins: [timeGridPlugin],
      events: this.listeventos
    };

    

  }
  ngOnInit(){

    this.serv.getServicios().subscribe(respuesta =>{
      this.servicios = respuesta as Servicio[];
    })

    this.fh.getFranjas().subscribe(respuesta =>{
      this.franjas = respuesta as FranjaHoraria[];

    })

    this.area.getAreas().subscribe(respuesta =>{
      this.areas = respuesta as Area[];
    })

    this.mascotaService.getMascotas().subscribe(respuesta =>{
      this.mascotas = respuesta as Mascota[];
    })

    this.paseadorService.getPaseadores().subscribe(respuesta =>{
      this.paseadores = respuesta as Paseador[];
    })

    this.area.getLocations().subscribe(respuesta =>{
      this.locations = respuesta as Localizacion[];
    })  

    this.clienteService.getClientes().subscribe(respuesta =>{
      this.clientes = respuesta as Cliente[];
    })

  }

  
}
