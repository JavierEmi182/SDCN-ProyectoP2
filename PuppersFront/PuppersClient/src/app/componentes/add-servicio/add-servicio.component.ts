import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { ArealocationService } from 'src/app/servicios/arealocation.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { PaseadorService } from 'src/app/servicios/paseador.service';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { Area } from 'src/app/interfaces/area';
import { Cliente } from 'src/app/interfaces/cliente';
import { Localizacion } from 'src/app/interfaces/localizacion';
import { Mascota } from 'src/app/interfaces/mascota';
import { Paseador } from 'src/app/interfaces/paseador';
import { FranjaService } from 'src/app/servicios/franja.service';
import { FranjaHoraria } from 'src/app/interfaces/franja-horaria';
const now = new Date();
@Component({
  selector: 'app-add-servicio',
  templateUrl: './add-servicio.component.html',
  styleUrls: ['./add-servicio.component.css']
})
export class AddServicioComponent {

  fecha = now;
  fechaString = this.fechaformat(this.fecha);
  clientes: Cliente[] = [];
  areas: Area[] = [];
  arrpresentar: Localizacion[] = [];
  localizaciones: Localizacion[] = [];
  localizaNew: Localizacion[] = [];
  mascotas: Mascota[] = [];
  paseadores: Paseador[] = [];
  franjas: FranjaHoraria[] = [];
  selectedPaseador = "default";
  selectedMascota = -1;
  selectedFranja = -1;
  areaLoaded = false;
  newLocation = false;
  messageError = false;
  constructor(private serv:ServicioService,private fh:FranjaService,private cliService:ClienteService, private paseadorService:PaseadorService, private mascService:MascotaService, private aloc:ArealocationService, private router:Router){
    cliService.getClientes().subscribe(respuesta => {
      this.clientes = respuesta as Cliente[];
    })

    mascService.getMascotas().subscribe(respuesta =>{
      this.mascotas = respuesta as Mascota[];
    })

    paseadorService.getPaseadores().subscribe(respuesta =>{
      this.paseadores = respuesta as Paseador[];
    })

    fh.getFranjas().subscribe(respuesta =>{
      this.franjas = respuesta as FranjaHoraria[];
    })



  


  }

  errorForm(){
    this.messageError = true;
    return 'Uno o mas parametros no se han seleccionado. Por favor revisa tus entradas!';

  }

  fechaformat(date: Date){
    return ([
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),
    ].join('-'))
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }



  onSubmit(){

    if(this.selectedMascota == -1 || this.selectedFranja == -1 || this.selectedPaseador == "default"){
      this.errorForm();
    }
    else{
      this.serv.addServicio(this.selectedMascota,this.selectedFranja,this.selectedPaseador).subscribe(respuesta =>{
        console.log(respuesta);
        alert("Se ha creado el servicio!")
        this.router.navigate(['/manageboard'])
      })
    }
  }


}
