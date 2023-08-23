/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';
import { Mascota } from 'src/app/interfaces/mascota';
import { Paseador } from 'src/app/interfaces/paseador';
import { Servicio } from 'src/app/interfaces/servicio';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { PaseadorService } from 'src/app/servicios/paseador.service';
import { ServicioService } from 'src/app/servicios/servicio.service';
@Component({
  selector: 'app-admin-mascota',
  templateUrl: './admin-mascota.component.html',
  styleUrls: ['./admin-mascota.component.css']
})
export class AdminMascotaComponent {
  mascotasAsignadas: Mascota[] = [];
  mascota: Mascota[] = [];
  dueno: Cliente[] = [];
  paseador: Paseador[] = [];
  servicio: Servicio[] = [];
  id_s!: number;
  duenoInfo!: Cliente;
  paseadorInfo!: Paseador;
  mascotaInfo!: Mascota;
  servicioInfo!: Servicio;
  dataready = false;
  constructor(private route:ActivatedRoute, private serv:ServicioService, private paseadorService:PaseadorService,private mascotaService:MascotaService,private clienteService:ClienteService, private router:Router){

  }

  ngOnInit(){

    const {id} = this.route.snapshot.params;
    this.id_s = parseInt(id);
    this.mascotaService.getMascota(id).subscribe(respuesta2 =>{
      this.mascota = respuesta2 as Mascota[];
      this.mascotaInfo = this.mascota[0];
      this.getData()
    })

  }

  getData(){
    this.serv.getServicioMascota(this.mascotaInfo.pet_token).subscribe(respuesta =>{
      this.servicio = respuesta as Servicio[];
      this.servicioInfo = this.servicio[0];
      let walkerid = "";
      if(this.servicio.length <=0){
        walkerid = "0000000000"
      }
      else{
        walkerid = this.servicioInfo.walker_ID

      }
      this.paseadorService.getPaseador(walkerid).subscribe(respuesta =>{
        this.paseador = respuesta as Paseador[];
        this.paseadorInfo = this.paseador[0];
        this.dataready = true;
      })
    })

    this.clienteService.getCliente(this.mascotaInfo.client_ID).subscribe(respuesta =>{
      this.dueno = respuesta as Cliente[];
      this.duenoInfo = this.dueno[0];
    })


    
  }

  del(){

    this.mascotaService.deleteMascota(this.id_s).subscribe(respuesta2 =>{
      console.log("Borrado!")
      this.router.navigate(['/manageboard'])
    })

  }


}
