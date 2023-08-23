/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  address_test = "http://localhost:4001"
  address_prod = "https://puppersappback-production.up.railway.app"
  address = ""
  TEST = false;
  tokenusr: any;

  constructor(private http: HttpClient,private token: TokenService) {
    this.tokenusr = token.getToken();
    if(this.TEST){
      this.address = this.address_test;
    }
    else{
      this.address = this.address_prod;
    }
   }

  getMascotas(){
    return this.http.get(this.address+'/mascotas/all',{headers:{'auth':this.tokenusr}}).pipe();
  }
  getMascota(id:number){
    return this.http.get(this.address+`/mascotas/${id}`,{headers:{'auth':this.tokenusr}}).pipe();
  } 
  getMascotabyClient(id:string){
    return this.http.get(this.address+`/mascotas/cliente/${id}`,{headers:{'auth':this.tokenusr}}).pipe();
  }
  getMascotabyWalker(id:string){
    return this.http.get(this.address+`/mascotas/paseador/${id}`,{headers:{'auth':this.tokenusr}}).pipe();
  }

  //Query cambiar
  getAllMascotasData(){
    return this.http.get(this.address+'/mascotasQueries/clientes/paseadores/all',{headers:{'auth':this.tokenusr}})
  }

  registerMascota(id:string,name:string,breed:string,service:string,renovation_date:string){
    return this.http.post(this.address+'/mascotas/add',{'client_ID':id,'pet_name':name,'pet_breed':breed,'service':service,'renovation_date':renovation_date},{headers:{'auth':this.tokenusr}})
  }

  deleteMascota(id:number){
    return this.http.delete(this.address+`/mascotas/delete/${id}`,{headers:{'auth':this.tokenusr}})

  }

  updateMascota(id:number,cid:string,name:string,breed:string,service:string,renovation_date:string){

    return this.http.put(this.address+'/mascotas/update',{'pet_token':id,"client_ID":cid,'pet_name':name,'pet_breed':breed,'service':service,'renovation_date':renovation_date},{headers:{'auth':this.tokenusr}})

  }
}
