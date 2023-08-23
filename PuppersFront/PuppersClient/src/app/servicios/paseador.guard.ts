import { Injectable } from "@angular/core";
import {  Router } from "@angular/router";
import { AuthyService } from "./authy.service";
import { TokenService } from "./token.service";
@Injectable({
  providedIn: 'root'
})
export class PaseadorGuard  {
  constructor(
		private authService: AuthyService, private tokSer: TokenService,
		private router: Router) { }
	canActivate(): boolean | Promise<boolean> {
    let isAuthenticated = false;
    if (this.tokSer.getToken()) {
      isAuthenticated = true;
    }
    const roles = this.tokSer.getRoles();
    let hasAccess = false;
		if (!isAuthenticated) {
			this.router.navigate(['/login']);
		}

    if(roles == "cliente"){
      this.router.navigate(['/homecliente'])
    }
    else if (roles == "admin"){
      this.router.navigate(['/dashboard'])
    }
    else{
      if(isAuthenticated && roles == 'paseador'){
        hasAccess = true;
      }
    }

		return isAuthenticated && hasAccess;
	}
  
  
}
