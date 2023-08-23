/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { Mascota } from '../../interfaces/mascota';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';
import { TokenService } from 'src/app/servicios/token.service';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { Servicio } from 'src/app/interfaces/servicio';
import { FranjaService } from 'src/app/servicios/franja.service';
import { FranjaHoraria } from 'src/app/interfaces/franja-horaria';
import { PaseadorService } from 'src/app/servicios/paseador.service';
import { PaseoService } from 'src/app/servicios/paseo.service';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
 mascota : Mascota[]=[];
ide !: any;
cliente : Cliente[]=[];
servicio : Servicio[]=[];
walker ='';
service='';
franja: FranjaHoraria[]=[];
paseosFaltantes=0
 constructor( private paseoSvc:PaseoService,private route: ActivatedRoute,private paseadorSvc : PaseadorService,private franjaSv : FranjaService, private servicioSv: ServicioService,private mascotasSvc:MascotaService, private tokenSvc: TokenService,private clienteSvc: ClienteService,private router: Router) { 

  const {id} = this.route.snapshot.params;
  
  
    this.mascotasSvc.getMascota(id).subscribe(peli=>{
      
      this.mascota = peli as Mascota[];
      console.log(this.mascota)
      // necesito acceder a walker id solo con id de mascota
      //this.walker=(this.mascota[0].walker_ID);

      //servicio para extraer la franja
servicioSv.getServicioMascota(id).subscribe(s=>{
  this.servicio= s as Servicio[];
  
  this.paseoSvc.getPaseoServicio(this.servicio[0].servicio_ID).subscribe(p=>{
    //regresa numero de paseos completados
    const numservicio =  Number(this.mascota[0].service.split("P")[0])*4
    console.log(numservicio)
    console.log(Object.values(p).length)
    this.paseosFaltantes= numservicio-(Object.values(p).length)

  })
  this.walker=this.servicio[0].walker_ID;
  
  //this.servicio[0].franja_id
  
  franjaSv.getFranja(this.servicio[0].franja_id).subscribe(f=>{
    this.franja= (f as FranjaHoraria[])
  });
});
       });

this.ide=this.tokenSvc.getId();
console.log(this.ide);
this.clienteSvc.getCliente(this.ide).subscribe(cl =>{
  this.cliente= cl as Cliente[];
  console.log(this.cliente);
});



}

  



}
