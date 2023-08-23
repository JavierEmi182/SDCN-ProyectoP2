/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class FranjaService {
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

  getFranjas(){
    return this.http.get(this.address+'/franjaHoraria/all',{headers:{'auth':this.tokenusr}})
  }

  getFranja(id:number){
    return this.http.get(this.address+`/franjaHoraria/${id}`,{headers:{'auth':this.tokenusr}})
  }

  addFranja(minuto:number,minutoe:number){
    return this.http.post(this.address+'/franjaHoraria/add',{"start_minute":minuto,"end_minute":minutoe},{headers:{'auth':this.tokenusr}})
  }
}
