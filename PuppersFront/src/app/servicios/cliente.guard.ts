import { Injectable } from "@angular/core";
import {  Router } from "@angular/router";
import { AuthyService } from "./authy.service";
import { TokenService } from "./token.service";
@Injectable({
  providedIn: 'root'
})
export class ClienteGuard  {
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

    if(roles == "paseador"){
      this.router.navigate(['/paseador'])
    }
    else if (roles == "admin"){
      this.router.navigate(['/dashboard'])
    }
    else{
      if(isAuthenticated && roles == 'cliente'){
        hasAccess = true;
      }
    }

		return isAuthenticated && hasAccess;
	}
  
}
