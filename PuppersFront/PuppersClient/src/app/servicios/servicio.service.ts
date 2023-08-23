/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  address_test = "http://localhost:4001"
  address_prod = "https://puppersappback-production.up.railway.app"
  address = ""
  TEST = false;
  tokenusr: any;

  constructor(private http: HttpClient, private token:TokenService) { 
    this.tokenusr = token.getToken();
    if(this.TEST){
      this.address = this.address_test;
    }
    else{
      this.address = this.address_prod;
    }
  }

  getServicios(){
    return this.http.get(this.address+'/servicios/all',{headers:{'auth':this.tokenusr}})
  }

  getServicio(id:number){
    return this.http.get(this.address+`/servicios/${id}`,{headers:{'auth':this.tokenusr}})
  }

  getServicioMascota(id:number){
    return this.http.get(this.address+`/servicios/mascotas/${id}`,{headers:{'auth':this.tokenusr}})
  }

  getServiciosMascota(id:number){
    return this.http.get(this.address+`/servicios/mascotas/all/${id}`,{headers:{'auth':this.tokenusr}})
  }

  getServiciosPaseador(id:string){
    return this.http.get(this.address+`/servicios/paseadores/${id}`,{headers:{'auth':this.tokenusr}})
  }

  getServiciosPaseadorMascota(id:number,walid:string){
    return this.http.get(this.address+`/servicios/mascota/paseador/${id}/${walid}`,{headers:{'auth':this.tokenusr}})
  }



  addServicio(ptoken:number,fid:number,wid:string){
    return this.http.post(this.address+'/servicios/add',{"pet_token":ptoken,"franja_id":fid,"walker_ID":wid},{headers:{'auth':this.tokenusr}})

  }

  deleteServicio(sid:number){
    return this.http.delete(this.address+`/servicios/delete/${sid}`,{headers:{'auth':this.tokenusr}})
  }

  editServicio(sid:number, fid:number,wid:string){
    return this.http.put(this.address+`/servicios/update`,{"servicio_ID":sid,"franja_id":fid,"walker_ID":wid},{headers:{'auth':this.tokenusr}})

  }
}
