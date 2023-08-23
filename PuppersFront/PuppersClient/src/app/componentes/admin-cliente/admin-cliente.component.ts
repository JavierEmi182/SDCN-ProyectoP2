/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from 'src/app/interfaces/area';
import { Cliente } from 'src/app/interfaces/cliente';
import { Localizacion } from 'src/app/interfaces/localizacion';
import { Mascota } from 'src/app/interfaces/mascota';
import { ArealocationService } from 'src/app/servicios/arealocation.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { PaseadorService } from 'src/app/servicios/paseador.service';

@Component({
  selector: 'app-admin-cliente',
  templateUrl: './admin-cliente.component.html',
  styleUrls: ['./admin-cliente.component.css']
})
export class AdminClienteComponent {
  mascotasAsignadas: Mascota[] = [];
  cliente: Cliente[] = [];
  clienteInfo!: Cliente;
  loc: Localizacion[] = [];
  locInfo!: Localizacion;
  area: Area[] = [];
  areaInfo!: Area;
  id_s!: string;
  dataready = false;
  locationready = false;
  constructor(private route:ActivatedRoute,private aloc:ArealocationService, private paseadorService:PaseadorService,private mascotaService:MascotaService,private clienteService:ClienteService, private router:Router){

  }

  ngOnInit(){

    const {id} = this.route.snapshot.params;
    this.id_s = id;
    this.clienteService.getCliente(id).subscribe(respuesta2 =>{
      this.cliente = respuesta2 as Cliente[];
      if(this.cliente.length > 0){
        this.clienteInfo = this.cliente[0];
        this.dataready = true;
        console.log(this.clienteInfo)
      }

      this.mascotaService.getMascotabyClient(id).subscribe(respuesta =>{
        this.mascotasAsignadas = respuesta as Mascota[];
        console.log(this.mascotasAsignadas)
  
      })

      this.aloc.getLocation(this.clienteInfo.location_id).subscribe(respuesta =>{
        this.loc = respuesta as Localizacion[];
        if(this.loc.length > 0){
          this.locInfo = this.loc[0]
          this.locationready = true;
          this.aloc.getArea(this.locInfo.area_id).subscribe(respuesta =>{
            this.area = respuesta as Area[];
            this.areaInfo = this.area[0];
          })
        }

        
  
      })
      
  
    })



    

  }


  restorePass(){
    this.clienteService.restoreAuth(this.clienteInfo.client_ID).subscribe(respuesta =>{
      alert("Se ha restaurado la contraseña")
      this.router.navigate(['/manageboard'])
    })
  }

  del(){

    this.clienteService.deleteCliente(this.id_s).subscribe(respuesta2 =>{
      console.log("Borrado!")
      this.router.navigate(['/manageboard'])
    })

  }

}
