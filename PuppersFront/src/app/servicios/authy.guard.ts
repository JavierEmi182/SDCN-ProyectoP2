import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthyService } from "./authy.service";
@Injectable({
  providedIn: 'root'
})
export class AuthyGuard  {
  constructor(
		private authService: AuthyService,
		private router: Router) { }
	canActivate(): boolean | Promise<boolean> {
		const isAuthenticated = this.authService.getAuthStatus();
		if (!isAuthenticated) {
			this.router.navigate(['/login']);
		}

		return isAuthenticated;
	}
  
}

