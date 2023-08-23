import { Injectable} from '@angular/core';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthyService {

  logged = false;
  valor1 = "";

  constructor(private userService: UserService){

  }

  loginSuccess(status: boolean){
    this.logged = status;
  }

  login(username: string, password:string,role:string){
    if(role == 'cliente'){
      return this.userService.loginCliente(username,password)
    }
    else if (role == 'paseador'){
      return this.userService.loginPaseador(username,password)
    }
    else{
      return this.userService.loginAdmin(username,password)
    }
  }


  getAuthStatus(){
    return this.logged;
  }




  
}
