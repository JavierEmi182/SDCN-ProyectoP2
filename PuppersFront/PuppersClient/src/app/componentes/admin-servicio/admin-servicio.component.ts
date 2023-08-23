/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { PaseadorService } from 'src/app/servicios/paseador.service';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { Servicio } from 'src/app/interfaces/servicio';
import { Mascota } from 'src/app/interfaces/mascota';
import { Paseador } from 'src/app/interfaces/paseador';
import { FranjaService } from 'src/app/servicios/franja.service';
import { FranjaHoraria } from 'src/app/interfaces/franja-horaria';
import { PaseoService } from 'src/app/servicios/paseo.service';
import { Paseo } from 'src/app/interfaces/paseo';
@Component({
  selector: 'app-admin-servicio',
  templateUrl: './admin-servicio.component.html',
  styleUrls: ['./admin-servicio.component.css']
})
export class AdminServicioComponent {

  id_serv!: number;
  servicioAc!: Servicio;
  servici: Servicio[] = [];
  dataready = false;
  code = false;
  mascota: Mascota[] = [];
  paseadores: Paseador[] = [];
  pase: Paseador[] = [];
  franj: FranjaHoraria[] = [];
  paseoslist: Paseo[] = [];
  arr: any[] = [];
  mascotaInf!: Mascota;
  paseador!: Paseador;
  fi!: FranjaHoraria;
  codigoRef = "";
  paseosDoneReady = false;
  constructor(private ps:PaseoService,private fh:FranjaService,private route:ActivatedRoute, private serv:ServicioService, private paseadorService:PaseadorService,private mascotaService:MascotaService,private clienteService:ClienteService, private router:Router){

  }
  

  ngOnInit(){
    const {id} = this.route.snapshot.params;
    this.id_serv = parseInt(id);
    this.serv.getServicio(this.id_serv).subscribe(respuesta2 =>{
      this.servici = respuesta2 as Servicio[];
      this.servicioAc= this.servici[0];
      this.getData()
    })
  }

  getData(){
    console.log("Data")
    this.dataready = true;

    this.mascotaService.getMascota(this.servicioAc.pet_token).subscribe(respuesta2 =>{
      this.mascota = respuesta2 as Mascota[];
      this.mascotaInf = this.mascota[0];
    })

    this.paseadorService.getPaseador(this.servicioAc.walker_ID).subscribe(respuesta2 =>{
      this.pase = respuesta2 as Paseador[];
      this.paseador = this.pase[0];
    })

    this.paseadorService.getPaseadores().subscribe(respuesta =>{
      this.paseadores = respuesta as Paseador[];
    })

    this.fh.getFranja(this.servicioAc.franja_id).subscribe(respuesta =>{
      this.franj = respuesta as FranjaHoraria[];
      this.fi = this.franj[0];
    })

    this.ps.getPaseoServicio(this.servicioAc.servicio_ID).subscribe(respuesta =>{
      this.paseoslist = respuesta as Paseo[];
      console.log(this.paseoslist);
      this.loadList();
    })




    
  }

  loadList(){
    let paseadorname = ""
    let number = 1;
    let fecha = "";
    for(const paseo of this.paseoslist){
      for(const paseador of this.paseadores){
        if(paseo.walker_ID == paseador.walker_ID){
          paseadorname = paseador.walker_name;
          const fechaparc = paseo.end_date.split("T");
          fecha = fechaparc[0];
        }

      }
      const mapa = {"no":number,"paseo_ID":paseo.paseo_ID,"walker_name":paseadorname,"fecha":fecha}
      number+=1
      this.arr.push(mapa)
    }
    this.paseosDoneReady = true;
  }

  renewService(){

    let count = 0
    let arrpase = []
    this.ps.getPaseoServicio(this.servicioAc.servicio_ID).subscribe(respuesta =>{
      arrpase = respuesta as Paseo[];
      console.log(arrpase);
      count = arrpase.length;
    })
    if(this.paseoActivo(count,this.mascotaInf.service)){
      alert("No se puede renovar el servicio, todavia quedan paseos restantes.")
    }
    else{
      this.serv.addServicio(this.mascotaInf.pet_token,this.fi.franja_id,this.paseador.walker_ID).subscribe(respuesta =>{
        alert("Se ha renovado el servicio!")
        this.router.navigate(['/manageboard'])
      })
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

  del(){

    this.serv.deleteServicio(this.id_serv).subscribe(respuesta2 =>{
      alert("Borrado!")
      this.router.navigate(['/manageboard'])
    })

  }
  getRandomInt(min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  shuffleCode(cod:string){
    const a = cod.split(""),
        n = a.length;

    for(let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

  generateRef(){
    console.log("Generando referencia.")
    const numeropet = this.mascotaInf.pet_token;
    let suma = 0;
    let codigo = "";
    while(suma < numeropet){
      let num = 0;
      if(numeropet < 9){
        num = this.getRandomInt(1,numeropet)
      }
      else{
        num = this.getRandomInt(1,9);
      }
      suma+=num
      if(suma > numeropet){
        const exceso = suma-numeropet
        console.log("Exceso", exceso, "Suma",suma,"Num",num)
        num-=exceso
        suma-=exceso
        console.log("Exceso despues", exceso, "Suma",suma,"Num",num)
      }
      else if(suma == numeropet){
        suma+=1;
      }
      codigo += num.toString();
    }
    if(codigo.length < 8){
      const restante = 8 - codigo.length
      const ceroadd = "0".repeat(restante)
      codigo+=ceroadd;
    }
    //codigo = this.shuffleCode(codigo);
    this.code = true;
    this.codigoRef = codigo;
    return codigo;
  }

}
