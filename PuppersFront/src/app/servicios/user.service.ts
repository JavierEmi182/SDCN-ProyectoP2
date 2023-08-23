/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  address_test = "http://localhost:4001"
  address_prod = "https://puppersappback-production.up.railway.app"
  address = ""
  TEST = false;


  constructor(private http: HttpClient) { 
    if(this.TEST){
      this.address = this.address_test;
    }
    else{
      this.address = this.address_prod;
    }
  }



  loginCliente(username: string, password: string): Observable<any>{

    return this.http.post(this.address+'/clientes/log',{'client_user':username,'client_password':password}, httpOptions)
  }
  loginAdmin(username: string, password: string): Observable<any>{
    return this.http.post(this.address+'/admin/log',{'admin_username':username,'admin_password':password})
  }
  loginPaseador(username: string, password: string): Observable<any>{
    return this.http.post(this.address+'/paseadores/log',{'walker_user':username,'walker_password':password}, httpOptions)
  }

}
