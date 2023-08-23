import { Component } from '@angular/core';

import { Mascota } from '../../interfaces/mascota';
import { MascotaService } from '../../servicios/mascota.service';
import { TokenService } from 'src/app/servicios/token.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { Cliente } from 'src/app/interfaces/cliente';
@Component({
  selector: 'app-homecliente',
  templateUrl: './homecliente.component.html',
  styleUrls: ['./homecliente.component.css']
})
export class HomeclienteComponent {
  
  selected='';
  mascotas:Mascota[]=[];
  ide = '';
  cliente : Cliente[]=[];
  constructor(private mascotaService: MascotaService, private tokenSvc: TokenService, private clientSvc: ClienteService){
   

    this.ide=this.tokenSvc.getId();
    console.log(this.ide);

    clientSvc.getCliente(this.ide).subscribe(res =>{
      this.cliente = res as Cliente[];
      console.log("cliente")
      console.log(this.cliente)
      
    });
    mascotaService.getMascotabyClient(this.ide).subscribe(respuesta => {
      this.mascotas = respuesta as Array<Mascota>;
      console.log(this.mascotas);
      });

    
  }
}
