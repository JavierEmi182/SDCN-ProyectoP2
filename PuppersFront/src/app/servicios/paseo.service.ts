/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PaseoService {
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

  getPaseos(){
    return this.http.get(this.address+'/paseos/all',{headers:{'auth':this.tokenusr}})
  }

  getPaseo(id:number){
    return this.http.get(this.address+`/paseos/${id}`,{headers:{'auth':this.tokenusr}})
  }

  getPaseosCountPaseador(id:string){
    return this.http.get(this.address+`/paseos/count/paseador/${id}`,{headers:{'auth':this.tokenusr}}).pipe()
  }

  getPaseoServicio(id:number){
    return this.http.get(this.address+`/paseos/servicio/${id}`,{headers:{'auth':this.tokenusr}})
  }
  
  getPaseoPaseadorCurrent(id:string){
    return this.http.get(this.address+`/paseos/paseador/current/${id}`,{headers:{'auth':this.tokenusr}})
  }

  getPaseoPaseadorServicio(id:string,sid:number){
    return this.http.get(this.address+`/paseos/count/paseador/servicio/${id}/${sid}`,{headers:{'auth':this.tokenusr}})

  }

  startPaseo(wid:string,sid:number){
    return this.http.post(this.address+'/paseos/start',{"walker_ID":wid,"servicio_ID":sid},{headers:{'auth':this.tokenusr}})
  }

  endPaseo(pid:number,evi:string){
    return this.http.put(this.address+'/paseos/end',{"paseo_ID":pid,"evidenceURL":evi},{headers:{'auth':this.tokenusr}})
  }
}
