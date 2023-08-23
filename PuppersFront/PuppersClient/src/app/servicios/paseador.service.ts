/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class PaseadorService {
  address_test = "http://localhost:4001"
  address_prod = "https://puppersappback-production.up.railway.app"
  address = ""
  TEST = false;
  tokenusr: any;

  constructor(private http: HttpClient, private token: TokenService) {
    this.tokenusr = token.getToken();
    if(this.TEST){
      this.address = this.address_test;
    }
    else{
      this.address = this.address_prod;
    }


   }

  getPaseadores(){
    return this.http.get(this.address+'/paseadores/all',{headers:{'auth':this.tokenusr}})
  }
  getPaseador(id:string){
    return this.http.get(this.address+`/paseadores/${id}`,{headers:{'auth':this.tokenusr}})
  
  }


  //Cambiar query
  getMascotasPaseador(id: string){
    return this.http.get(this.address+`/mascotasQueries/paseadores/${id}`,{headers:{'auth':this.tokenusr}});
  }

  registerPaseador(ced: string, cel: string, name:string, date: string, username: string, password: string,addr:string, addr_link:string,phlink:string,bt:string){
    console.log({'walker_ID':ced, 'walker_tel':cel, 'walker_name':name, 'start_date':date, 'walker_user':username,'walker_password':password,"walker_address":addr,"walker_linkaddress":addr_link,"walker_photoURL":phlink,"walker_bloodtype":bt})
    return this.http.post(this.address+'/paseadores/add',{'walker_ID':ced, 'walker_tel':cel, 'walker_name':name, 'start_date':date, 'walker_user':username,'walker_password':password,"walker_address":addr,"walker_linkaddress":addr_link,"walker_photoURL":phlink,"walker_bloodtype":bt},{headers:{'auth':this.tokenusr}})
  }

  deletePaseador(id: string){

    return this.http.delete(this.address+`/paseadores/delete/${id}`,{headers:{'auth':this.tokenusr}})
  }

  updatePaseador(ced: string, cel: string, name:string, date: string,addr:string, addr_link:string,phlink:string,bt:string){

    return this.http.put(this.address+'/paseadores/update',{'walker_ID':ced, 'walker_tel':cel, 'walker_name':name, 'start_date':date,"walker_address":addr,"walker_linkaddress":addr_link,"walker_photoURL":phlink,"walker_bloodtype":bt},{headers:{'auth':this.tokenusr}})
  }

  updateAuth(user:string,opass:string,nus:string,np:string){
    return this.http.put(this.address+'/paseadores/update/auth',{"walker_user":user,"walker_password":opass,"new_user":nus,"new_password":np},{headers:{'auth':this.tokenusr}})
  }

  restoreAuth(id:string){
    return this.http.put(this.address+'/admin/restore/paseador',{"walker_ID":id},{headers:{'auth':this.tokenusr}})
  }


  
}
