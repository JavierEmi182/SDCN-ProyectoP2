import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthyService } from "./authy.service";
import { TokenService } from "./token.service";
@Injectable({
  providedIn: 'root'
})
export class AdminGuard  {
  constructor(
		private authService: AuthyService, private tokSer: TokenService,
		private router: Router) { }
	canActivate(): boolean | Promise<boolean> {
    
    let isAuthenticated = false;
    if (this.tokSer.getToken()) {
      isAuthenticated = true;
    }
    let hasAccess = false;
    const roles = this.tokSer.getRoles();
		if (!isAuthenticated) {
			this.router.navigate(['/login']);
		}

    if(roles == "cliente"){
      this.router.navigate(['/homecliente'])
    }
    else if (roles == "paseador"){
      this.router.navigate(['/paseador'])
    }
    else{
      if(isAuthenticated && roles == 'admin'){
        hasAccess = true;
      }
    }

    console.log(roles)
    console.log(isAuthenticated)
    console.log(hasAccess)

		return isAuthenticated && hasAccess;
	}
  
}
