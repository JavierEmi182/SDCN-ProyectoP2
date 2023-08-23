/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { AuthyService } from 'src/app/servicios/authy.service';
import { TokenService } from 'src/app/servicios/token.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  selected = 'admin';
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  rolesjson = this.tokenStorage.getRoles();
  id = this.tokenStorage.getId();


  constructor(private authService: AuthyService, private tokenStorage: TokenService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
    if (this.isLoggedIn){
      this.redirect();
    }
  }
  

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password,this.selected).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data['token']);
        this.tokenStorage.saveRoles(this.selected);
        this.tokenStorage.saveUser(username);
        this.id = this.tokenStorage.getId();
        this.rolesjson = this.tokenStorage.getRoles();
        if(this.rolesjson == 'paseador'){
          this.tokenStorage.saveID(data['walker_ID']);
        }
        else{
          this.tokenStorage.saveID(data['client_ID']);
        }
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.authService.loginSuccess(this.isLoggedIn);
        this.redirect();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  redirect(): void{
    if(this.rolesjson == 'admin'){
      this.router.navigate(['/dashboard'])
    }
    else if(this.rolesjson == 'paseador'){
      this.router.navigate(['/paseador'])
    }
    else{
      this.router.navigate(['/homecliente'])
    }

  }

  reloadPage(): void {
    window.location.reload();
    this.redirect();
  }
}