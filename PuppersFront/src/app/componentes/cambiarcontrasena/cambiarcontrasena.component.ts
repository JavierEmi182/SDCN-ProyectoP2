/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthyService } from 'src/app/servicios/authy.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { PaseadorService } from 'src/app/servicios/paseador.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-cambiarcontrasena',
  templateUrl: './cambiarcontrasena.component.html',
  styleUrls: ['./cambiarcontrasena.component.css']
})
export class CambiarcontrasenaComponent {


  user = ""
  roles = "";
  admin = false;
  userState  = true;
  constructor(private cliService:ClienteService,private paseadorService:PaseadorService,private authService: AuthyService, private tokenStorage: TokenService, private router: Router) { 

  }

  ngOnInit(){
    this.user = this.tokenStorage.getUser();
    console.log(this.user)
    this.roles = this.tokenStorage.getRoles();
    console.log(this.roles)
    if(this.roles == 'admin'){
      this.admin = true;
      this.userState=false;
    }
  }

  form: any = {
    password: null,
    newpassword: null
  };

  isLoginFailed = false;
  errorMessage = '';

  logout(): void {
    this.tokenStorage.signOut();
    window.location.reload();
  }



  onSubmit(){
    const { username, password,newpassword } = this.form;

    if(this.roles == 'paseador'){
      console.log(password)
      console.log(newpassword)

      this.paseadorService.updateAuth(this.user,password,username,newpassword).subscribe(respuesta =>{
        alert("Se ha cambiado la contrasena.")
        this.logout();
      })


    }
    else{
      this.cliService.updateAuth(this.user,password,username,newpassword).subscribe(respuesta =>{
        alert("Se ha cambiado la contrasena.")
        this.logout();
      })

    }


    
  }

  redirect(): void{
    if(this.roles == 'admin'){
      this.router.navigate(['/dashboard'])
    }
    else if(this.roles == 'paseador'){
      this.router.navigate(['/paseador'])
    }
    else{
      this.router.navigate(['/homecliente'])
    }

  }

}
