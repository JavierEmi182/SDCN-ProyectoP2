/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { Mascota } from '../../interfaces/mascota';
import { MascotaService } from 'src/app/servicios/mascota.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { PaseadorService } from 'src/app/servicios/paseador.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Paseador } from 'src/app/interfaces/paseador';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { PaseoService } from 'src/app/servicios/paseo.service';
import * as moment from 'moment';
import { Servicio } from 'src/app/interfaces/servicio';
import { Paseo } from 'src/app/interfaces/paseo';
const mesact = moment(moment.now()).format("MM")
const yract = moment(moment.now()).format("YYYY")

@Component({
  selector: 'app-admin-paseador',
  templateUrl: './admin-paseador.component.html',
  styleUrls: ['./admin-paseador.component.css']
})
export class AdminPaseadorComponent {
  mascotasAsignadas: Mascota[] = [];
  mascotas : Mascota[] = [];
  paseador: Paseador[] = [];
  paseadorInfo!: Paseador;
  id_s!: string;
  notdelete = false;
  countmesready = false;
  arrpase: Paseo[] = [];
  count = 0;
  countmes = 0;
  resp: any;
  precio = 0;
  serviciospaseador: Servicio[] = [];
  meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
  link_defaultpaseador = "https://firebasestorage.googleapis.com/v0/b/puppersimage.appspot.com/o/puppers%2Fprofile.png?alt=media&token=0778deb9-2a8e-4e82-8f38-b42a7861c40c"
  link = "";
  selectedmonth = "default";
  constructor(private paseo:PaseoService,private route:ActivatedRoute, private serv:ServicioService, private paseadorService:PaseadorService,private mascotaService:MascotaService,private clienteService:ClienteService, private router:Router){
    console.log(mesact);
    console.log(yract);
  }

  ngOnInit(){

    const {id} = this.route.snapshot.params;
    this.id_s = id;

    this.paseadorService.getPaseador(id).subscribe(respuesta2 =>{
      this.paseador = respuesta2 as Paseador[];
      this.paseadorInfo = this.paseador[0];
      if(this.paseadorInfo.walker_photoURL == "" || this.paseadorInfo.walker_photoURL == null){
        this.link = this.link_defaultpaseador
      }
      else{
        this.link = this.paseadorInfo.walker_photoURL
      }
    })

    this.mascotaService.getMascotas().subscribe(respuesta =>{
      this.mascotas = respuesta as Mascota[];
    })

    this.paseo.getPaseosCountPaseador(id).subscribe(respuesta =>{
      this.resp = respuesta;
      this.count = this.resp.total
    })

    this.serv.getServiciosPaseador(id).subscribe(respuesta =>{
      this.serviciospaseador = respuesta as Servicio[];
      console.log(this.serviciospaseador);
      this.obtenerMascotasServiciosActivos();
    })

  }

  parseMonth(valormes: number){
    let stringfechastart = "";
    let stringfechafin = "";
    if(valormes <= 9){
      stringfechastart = yract.toString() + "-0" + valormes.toString() + "-" + "01" ;
      if(valormes %2 == 0 && valormes != 2){ //No es febrero
        //yract.toString() + "-" + "0" + valormes.toString() + "30";
        stringfechafin = yract.toString() + "-" + "0" + valormes.toString() + "-" + "30";
      }
      else if( valormes == 2){
        stringfechafin = yract.toString() + "-" + "0" + valormes.toString() + "-" + "28";
      }
      else{
        stringfechafin = yract.toString() + "-" + "0" + valormes.toString() + "-" + "31";
      }

    }
    else{
      stringfechastart = yract.toString() + "-" + valormes.toString() + "-"+ "01";
      if(valormes %2 == 0){ //No es febrero

        //yract.toString() + "-" + valormes.toString() + "30";
        stringfechafin = yract.toString() + "-" + valormes.toString() + "-" +"30";
      }
      else{
        stringfechafin = yract.toString() + "-" + valormes.toString() + "-" +  "31";
      }

    }

    return [stringfechastart,stringfechafin];

  }

  parseDate(fecha:string){
    const fechaparc = fecha.split("T");
    const fechareturn = fechaparc[0];
    return fechareturn;
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

  obtenerMascotasServiciosActivos(){
    let count = 0;
    const listareturn = [];
    let service = "";
    for(const servi of this.serviciospaseador){
      if(servi.walker_ID == this.paseadorInfo.walker_ID){

        this.paseo.getPaseoServicio(servi.servicio_ID).subscribe(respuesta =>{
          this.arrpase = respuesta as Paseo[];
          console.log(this.arrpase);
          count = this.arrpase.length;
        })
        for(const masc of this.mascotas){
          if(servi.pet_token == masc.pet_token){
            service = masc.service;
            if(this.paseoActivo(count,service)){
              listareturn.push(masc);
            }
          }
        }   
      }
    }

    this.mascotasAsignadas = listareturn;

  }

  obtenerPaseosMes(mes:string){
    this.countmes = 0;
    this.precio = 0;
    let arreglofechas = [];
    const valormes = this.meses.indexOf(mes) + 1;
    arreglofechas = this.parseMonth(valormes);
    console.log(arreglofechas);
    const fechastart = arreglofechas[0]
    const fechafin  = arreglofechas[1];
    const fechaDateinicio = moment(fechastart);

    const fechaDatefin = moment(fechafin);
    for(const serv of this.serviciospaseador){
      let paseos: Paseo[] = [];
      this.paseo.getPaseoServicio(serv.servicio_ID).subscribe(respuesta =>{
        paseos = respuesta as Paseo[];
        for(const paseoind of paseos){
          const fechapaseo = this.parseDate(paseoind.end_date);
          const fechapaseomom = moment(fechapaseo);
          if(fechapaseomom.isBetween(fechaDateinicio,fechaDatefin)){
            for(const masc of this.mascotas){
              if(masc.pet_token == serv.pet_token){
                const serv = masc.service;
                if(serv == "5P"){
                  this.countmes+=1
                  this.precio+=2.5
                }
                else{
                  this.countmes+=1
                  this.precio+=2
                }
              }
            }
          }


        }
      })
    }


    this.countmesready = true;

    



  }

  restorePass(){
    this.paseadorService.restoreAuth(this.paseadorInfo.walker_ID).subscribe(respuesta =>{
      alert("Se ha restaurado la contraseña")
      this.router.navigate(['/manageboard'])
    })
  }

  del(){
    if(this.mascotasAsignadas.length <= 0){
      this.paseadorService.deletePaseador(this.id_s).subscribe(respuesta2 =>{
        alert("Se ha borrado el paseador.")
        this.router.navigate(['/manageboard'])
      })
    }
    else{
      alert("No se puede borrar el paseador por que tiene mascotas asignadas.")
      this.notdelete = true;
    }

  }

}
