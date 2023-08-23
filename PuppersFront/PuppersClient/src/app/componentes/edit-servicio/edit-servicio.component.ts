/* eslint-disable @angular-eslint/use-lifecycle-interface */
import {Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArealocationService } from 'src/app/servicios/arealocation.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { PaseadorService } from 'src/app/servicios/paseador.service';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { Servicio } from 'src/app/interfaces/servicio';
import { Area } from 'src/app/interfaces/area';
import { Cliente } from 'src/app/interfaces/cliente';
import { Localizacion } from 'src/app/interfaces/localizacion';
import { Mascota } from 'src/app/interfaces/mascota';
import { Paseador } from 'src/app/interfaces/paseador';
import { FranjaService } from 'src/app/servicios/franja.service';
import { FranjaHoraria } from 'src/app/interfaces/franja-horaria';
@Component({
  selector: 'app-edit-servicio',
  templateUrl: './edit-servicio.component.html',
  styleUrls: ['./edit-servicio.component.css']
})
export class EditServicioComponent {

  clientes: Cliente[] = [];
  areas: Area[] = [];
  arrpresentar: Localizacion[] = [];
  localizaciones: Localizacion[] = [];
  localizaNew: Localizacion[] = [];
  mascotas: Mascota[] = [];
  franjas: FranjaHoraria[] = [];
  mascota: Mascota[] = [];
  paseadores: Paseador[] = [];
  pase: Paseador[] = [];
  franj: FranjaHoraria[] = [];
  selectedPaseador = "default";
  selectedMascota = "";
  selectedFranja = "";
  messageError = false;
  servicioAc!: Servicio;
  servici: Servicio[] = [];
  id_serv!: number;
  mascotaInf!: Mascota;
  paseador!: Paseador;
  fi!: FranjaHoraria;
  ngOnInit(){
    const {id} = this.route.snapshot.params;
    this.id_serv = parseInt(id);
    this.serv.getServicio(this.id_serv).subscribe(respuesta2 =>{
      this.servici = respuesta2 as Servicio[];
      this.servicioAc= this.servici[0];
      this.getData()
    })
  }
  constructor(private route:ActivatedRoute,private serv:ServicioService,private fh:FranjaService,private cliService:ClienteService, private paseadorService:PaseadorService, private mascService:MascotaService, private aloc:ArealocationService, private router:Router){
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

  getData(){

    this.mascService.getMascota(this.servicioAc.pet_token).subscribe(respuesta2 =>{
      this.mascota = respuesta2 as Mascota[];
      this.mascotaInf = this.mascota[0];
      this.selectedMascota = this.mascotaInf.pet_token.toString();
    })

    this.paseadorService.getPaseador(this.servicioAc.walker_ID).subscribe(respuesta2 =>{
      this.pase = respuesta2 as Paseador[];
      this.paseador = this.pase[0];
      this.selectedPaseador = this.paseador.walker_ID;
    })
    this.fh.getFranja(this.servicioAc.franja_id).subscribe(respuesta =>{
      this.franj = respuesta as FranjaHoraria[];
      this.fi = this.franj[0];
      this.selectedFranja = this.fi.franja_id.toString();
    })

    
  }

  errorForm(){
    this.messageError = true;
    return 'Uno o mas parametros no se han seleccionado. Por favor revisa tus entradas!';

  }

  onSubmit(){

    if(parseInt(this.selectedMascota) == -1 || parseInt(this.selectedFranja) == -1 || this.selectedPaseador == "default"){
      this.errorForm();
    }
    else{

      this.serv.editServicio(this.servicioAc.servicio_ID,parseInt(this.selectedFranja),this.selectedPaseador).subscribe(respuesta =>{
        console.log(respuesta);
        alert("Se ha editado el servicio!")
        this.router.navigate(['/manageboard'])
      })
  
    }
  }

}
