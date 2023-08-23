import { Component } from '@angular/core';
import { Paseador } from 'src/app/interfaces/paseador';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { PaseadorService } from 'src/app/servicios/paseador.service';
import { TokenService } from 'src/app/servicios/token.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { PaseoService } from 'src/app/servicios/paseo.service';

@Component({
  selector: 'app-paseadorprofile',
  templateUrl: './paseadorprofile.component.html',
  styleUrls: ['./paseadorprofile.component.css']
})
export class PaseadorprofileComponent {
  paseador : Paseador[]=[]
  ide=''
  idepaseador=''
  mascota:Mascota[]=[]
  cliente: Cliente[]=[]
  cuentapaseos=0;
  conteo =0
  
  constructor( private route: ActivatedRoute,private paseoSvc:PaseoService, private router: Router, private tokenSvc: TokenService, private paseadorSvc:PaseadorService, private mascotasSvc: MascotaService,private clienteSvc:ClienteService){
    const {id,pet} = this.route.snapshot.params;
    console.log(id)
    this.ide=tokenSvc.getId();
   

    paseadorSvc.getPaseador(id).subscribe(res =>{
      this.paseador = res as Paseador[];
      
      
    });
    
    paseoSvc.getPaseosCountPaseador(id).subscribe(c=>{
      //this.conteo=c as Object[];
      //console.log(this.conteo[0])
    this.conteo = Object.values(c)[0]
      
      //console.log(this.conteo)
    });
    mascotasSvc.getMascota(pet).subscribe(res=>{
        this.mascota= res as Mascota[];
    });
    clienteSvc.getCliente(this.ide).subscribe(res=>{
      this.cliente= res as Cliente[];
    });


  }
}
