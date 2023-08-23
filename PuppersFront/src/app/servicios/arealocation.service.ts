/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ArealocationService {
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

  getAreas(){
    return this.http.get(this.address+'/areas/all',{headers:{'auth':this.tokenusr}})
  }

  getArea(id:number){
    return this.http.get(this.address+`/areas/${id}`,{headers:{'auth':this.tokenusr}})
  }

  addArea(name:string){
    return this.http.post(this.address+'/areas/add',{"area_name":name},{headers:{'auth':this.tokenusr}})
  }




  getLocations(){
    return this.http.get(this.address+'/locations/all',{headers:{'auth':this.tokenusr}})
  }

  getLocation(id:number){
    return this.http.get(this.address+`/locations/${id}`,{headers:{'auth':this.tokenusr}})
  }

  addLocation(name:string,aid:number){
    return this.http.post(this.address+'/locations/add',{"location_name":name,"area_id":aid},{headers:{'auth':this.tokenusr}})

  }

}
