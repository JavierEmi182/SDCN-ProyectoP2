/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Mascota } from '../../interfaces/mascota';
import { MascotaService } from '../../servicios/mascota.service';
import { TokenService } from 'src/app/servicios/token.service';
import { Paseador } from 'src/app/interfaces/paseador';
import { PaseadorService } from 'src/app/servicios/paseador.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { ArealocationService } from 'src/app/servicios/arealocation.service';
import { Localizacion } from 'src/app/interfaces/localizacion';
import { Area } from 'src/app/interfaces/area';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { PaseoService } from 'src/app/servicios/paseo.service';
import { ServicioService } from 'src/app/servicios/servicio.service';
import { Servicio } from 'src/app/interfaces/servicio';
import { Paseo } from 'src/app/interfaces/paseo';
@Component({
  selector: 'app-paseador',
  templateUrl: './paseador.component.html',
  styleUrls: ['./paseador.component.css']
})
export class PaseadorComponent {
  arreglo=Array<Object>
  mascotas:Mascota[]=[];
  selected=0;

  paseador: Paseador[]=[];
  ide =''
  idepaseador=''
  mascota : Mascota[]=[]
  cliente : Cliente[]=[]
  location : Localizacion[]=[]
  location2=''
  cedula = ''
  area : Area[]=[]
  mascotabreed=''
  areaname='';
  mostrar=true;
  photopaseo=''
  servicio :Servicio[]=[] 
  paseo : Paseo[]=[]
 mostrar2=true;
  haycodigo=false
  constructor(private fireStorage:AngularFireStorage, private paseoSvc : PaseoService,private mascotaService: MascotaService,private tokenSvc: TokenService,private paseadorSvc: PaseadorService, private clienteSvc : ClienteService,private locationSvc : ArealocationService,private servicioSvc:ServicioService){
    this.ide= tokenSvc.getId();
   mascotaService.getMascotabyWalker(this.ide).subscribe(respuesta => {
    this.mascotas = respuesta as Array<Mascota>;
    
    });


    


    paseadorSvc.getPaseador(this.ide).subscribe(res =>{
      this.paseador = res as Paseador[];
    });
    
    this.codigo.valueChanges.subscribe(value =>{
      this.codigo.setValue(value,{emitEvent:false})
      this.codval= this.codigo.value;
    })
    
    
  }
  

codigo = new FormControl('');
codval: any = this.codigo.value;
  obtenerDatosVista(){
      
      if(this.mostrar==true){
        this.mostrar2=false;
      }
      this.mascotaService.getMascota(this.selected).subscribe(res =>{
      this.mascota = res as Mascota[];
      this.mascotabreed= this.mascota[0].pet_breed;
      console.log("mascota")
      console.log(this.mascota)
      
      this.cedula = (this.mascota[0].client_ID);

      this.clienteSvc.getCliente(this.cedula).subscribe(r=>{
        this.cliente= r as Cliente[];
        console.log(this.cliente)
        
        this.locationSvc.getLocation(this.cliente[0].location_id).subscribe(l=>{
          this.location= l as Localizacion[];
          this.location2=this.location[0].location_name;
          this.locationSvc.getArea(this.location[0].area_id).subscribe(a=>{
            this.area = a as Area[];
            this.areaname= this.area[0].area_name
          });
        });

      });


      });
      
      
      

    }

onSubmitInicio(){
  //validar que no marque 2 veces
  if(this.selected==0){
    window.alert("debe seleccionar una mascota primero")
  }else{
    //this.mostrar=true;
    //validar que no haya iniciado
    

    console.log(this.mascota[0].pet_token)
    console.log(this.paseador[0].walker_ID)
    this.servicioSvc.getServiciosPaseadorMascota(this.mascota[0].pet_token,this.paseador[0].walker_ID).subscribe(ser=>{
    this.servicio=ser as Servicio[];
    console.log(this.servicio);


      //aqui validar que ya no haya iniciado antes de escribirlo
      //start paseo

      
      this.paseoSvc.getPaseoPaseadorCurrent(this.paseador[0].walker_ID).subscribe(p=>{
        //retorna paseos actuales para ese paseador
        //ahora validar el servicio actual
        let escrito= false;
        
        const serviceid= this.servicio[0].servicio_ID;
        console.log("servicio")
        console.log(serviceid)


        const walker= this.paseador[0].walker_ID;
        
        Object.values(p).forEach(function (element){
          //console.log(Object(element)["paseo_ID"])
          
          console.log((Object(element)["end_date"])==null)
          if( (serviceid==(Object(element)["servicio_ID"])) && (walker==(Object(element)["walker_ID"])) &&  ((Object(element)["end_date"])==null)){
            //console.log(Object(element)["paseo_ID"])
            escrito=true;
            console.log(escrito)
            
            
            
          }
          
        });


        if(escrito){
          window.alert("ya inició este paseo")
        }else{
          this.paseoSvc.startPaseo(this.paseador[0].walker_ID,this.servicio[0].servicio_ID).subscribe(spaseo=>{
            console.log(spaseo)
          });
        }

          
        })

        
      



  });
  
  
  }
  
}

onSubmitFin(){
  //validar que este seleccionado la mascota
  if(this.selected==0){
    window.alert("Selecciona una mascota antes de marcar la salida")
  }else{
    this.paseoSvc.getPaseoPaseadorCurrent(this.paseador[0].walker_ID).subscribe(p=>{

      this.servicioSvc.getServiciosPaseadorMascota(this.mascota[0].pet_token,this.paseador[0].walker_ID).subscribe(ser=>{
        this.servicio= ser as Servicio[];
        const serviceid= this.servicio[0].servicio_ID;
        const walker= this.paseador[0].walker_ID;
        console.log(walker)
        console.log(serviceid)
        // validar que hayan paseos
        if(Object.values(p).length >0){
          console.log("entra")

           //si es que no encuentra el paseo mandar alerta de que inicie
        let paseoid=-1;
        Object.values(p).forEach(function (element){
          //console.log(Object(element)["paseo_ID"])
          
          console.log((Object(element)["end_date"])==null)
          if( (serviceid==(Object(element)["servicio_ID"])) && (walker==(Object(element)["walker_ID"])) &&  ((Object(element)["end_date"])==null)){
            //console.log(Object(element)["paseo_ID"])
            paseoid=Object(element)["paseo_ID"];
            
            
            
          }
          
        });

        //si es que sale del for y no encontró nada 
              if (paseoid==-1){
                window.alert("Debe iniciar un paseo primero")
              }else{//validar que suba foto
                  //llamar al service de finalizar
                  if(this.photopaseo!=''){
                    this.paseoSvc.endPaseo(paseoid,this.photopaseo).subscribe(r=>{
                      console.log(r);
                    })
                  }else{
                    window.alert("Debe subir una foto")
                  }
                  
              }

        }else{
          window.alert("Debe marcar el inicio de un paseo primero")
        }
       

      
      })
      
      
      //validar con servicio y ya obtendria el paseo id

    })
    //validar que no marque 2 veces
  }
  
}

onSubmitCodigo(){
  if(this.codigo==null){
    window.alert("Debe ingresar un código")
  }
  this.mostrar=false;
  const cod = this.codval.toString();
  let suma=0;
  for(let x=0;x<cod.length;x++){
    suma+= parseInt(cod[x])
  }
  console.log(suma);
  this.selected=suma;
  this.obtenerDatosVista()
  
}


async onFileChange(event:any){
  const file = event.target.files[0]
  if(file){
    const path = `puppers/${file.name}`
    const uploadTask =await this.fireStorage.upload(path,file)
    this.photopaseo = await uploadTask.ref.getDownloadURL()
    console.log(this.photopaseo)

  }
}


}
