/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
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

  getClientes(){
    return this.http.get(this.address+'/clientes/all',{headers:{'auth':this.tokenusr}});
  }
    //  /mascotas/cliente/:client_tel 

  getCliente(id:string){
      return this.http.get(this.address+`/clientes/${id}`,{headers:{'auth':this.tokenusr}});
  }
  

  //Cambiar queries
  getClientesArea(){
    return this.http.get(this.address+'/mascotasQueries/clientes/all',{headers:{'auth':this.tokenusr}});
  }

  getClientesAreaSpec(area: string){
    return this.http.get(this.address+`/mascotasQueries/clientes/area/${area}`,{headers:{'auth':this.tokenusr}});
  }

  getClientesLocation(loc: string){
    return this.http.get(this.address+`/mascotasQueries/clientes/location/${loc}`,{headers:{'auth':this.tokenusr}});
  }

  registerCliente(cel:string, id:string, name: string, date: string, email:string, username: string, password: string, location:number, adlink:string){
    console.log({'client_tel':cel, "client_ID":id, 'client_name':name, 'start_date':date,'client_email':email,'client_user':username,'client_password':password, 'location_id':location, 'address_link':adlink})
    return this.http.post(this.address+'/clientes/add',{'client_tel':cel, "client_ID":id, 'client_name':name, 'start_date':date,'client_email':email,'client_user':username,'client_password':password, 'location_id':location, 'address_link':adlink},{headers:{'auth':this.tokenusr}})
  }

  deleteCliente(id:string){

    return this.http.delete(this.address+`/clientes/delete/${id}`,{headers:{'auth':this.tokenusr}})

  }

  updateCliente(cel:string, id:string, name: string, date: string, email:string, location:number, adlink:string){
    return this.http.put(this.address+'/clientes/update',{'client_tel':cel, "client_ID":id, 'client_name':name, 'start_date':date,'client_email':email, 'location_id':location, 'address_link':adlink},{headers:{'auth':this.tokenusr}})
  }

  restoreAuth(id:string){
    return this.http.put(this.address+'/admin/restore/cliente',{"client_ID":id},{headers:{'auth':this.tokenusr}})
  }

  updateAuth(user:string,opass:string,nus:string,np:string){
    return this.http.put(this.address+'/clientes/update/auth',{"client_user":user,"client_password":opass,"new_user":nus,"new_password":np},{headers:{'auth':this.tokenusr}})
  }


}
